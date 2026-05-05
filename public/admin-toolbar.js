// Floating admin toolbar — injected into every page via Astro,
// but only renders on the Keystatic admin (/keystatic and /admin).
(() => {
  const isAdmin = () =>
    location.pathname === "/keystatic" ||
    location.pathname.startsWith("/keystatic/") ||
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  if (!isAdmin()) return;
  if (document.getElementById("hf-admin-toolbar")) return;

  const wrap = document.createElement("div");
  wrap.id = "hf-admin-toolbar";
  wrap.innerHTML = `
    <a id="hf-admin-back" href="/" title="Return to henrickf.com">
      <span aria-hidden="true">←</span> Back to site
    </a>
    <button id="hf-admin-logout" type="button" title="Log out of Keystatic">
      Log out
    </button>
  `;

  const style = document.createElement("style");
  style.textContent = `
    #hf-admin-toolbar {
      position: fixed;
      left: 16px;
      bottom: 16px;
      z-index: 2147483646;
      display: flex;
      gap: 6px;
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      font-size: 12px;
      letter-spacing: 0.02em;
    }
    #hf-admin-toolbar a, #hf-admin-toolbar button {
      appearance: none;
      border: 1px solid rgba(0,0,0,0.12);
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(6px);
      color: #14110f;
      padding: 6px 10px;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      line-height: 1;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
      transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
    }
    #hf-admin-toolbar a:hover, #hf-admin-toolbar button:hover {
      background: #14110f;
      border-color: #14110f;
      color: #ffffff;
    }
    @media (prefers-color-scheme: dark) {
      #hf-admin-toolbar a, #hf-admin-toolbar button {
        background: rgba(20,17,15,0.85);
        color: #f5f1ea;
        border-color: rgba(255,255,255,0.16);
      }
      #hf-admin-toolbar a:hover, #hf-admin-toolbar button:hover {
        background: #f5f1ea;
        color: #14110f;
        border-color: #f5f1ea;
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(wrap);

  document
    .getElementById("hf-admin-logout")
    ?.addEventListener("click", async () => {
      // GitHub-storage logout is the only server-side flow Keystatic exposes.
      // In local-storage mode this is a no-op; we just send the user home.
      try {
        await fetch("/api/keystatic/github/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch {}
      location.href = "/";
    });

  // ---- Categories label patch -------------------------------------------
  // Keystatic renders array fields in collection tables as String(value),
  // i.e. comma-joined slugs. We don't want to see "app,platform" in the
  // Categories column — we want the same labels that appear on the homepage
  // chips. Fetch the master list, then walk the table cells and rewrite
  // any cell whose text is a comma-separated bag of known slugs.

  let labelMap = null;

  const fetchLabels = async () => {
    if (labelMap) return labelMap;
    try {
      const res = await fetch("/api/categories.json", { credentials: "same-origin" });
      if (!res.ok) return null;
      const data = await res.json();
      const map = Object.create(null);
      for (const item of data?.items ?? []) {
        if (item?.value && item?.label) map[item.value] = item.label;
      }
      labelMap = map;
      return labelMap;
    } catch {
      return null;
    }
  };

  const PATCHED_FLAG = "hfCategoryLabelOf";

  const patchCellsIn = (root, map) => {
    if (!root || !map) return;
    // Keystatic renders cells with role="rowheader" (first cell) and role="gridcell"
    // for the rest. Both can hold our column. Walk every text-bearing element under
    // the cell and replace if it's a recognized slug bag.
    const cells = root.querySelectorAll('[role="rowheader"], [role="gridcell"], td');
    cells.forEach((cell) => {
      // Find the smallest element whose text is exactly the slug bag — usually a span.
      const candidates = cell.querySelectorAll("*");
      const targets = candidates.length ? candidates : [cell];
      targets.forEach((el) => {
        if (el.children.length > 0) return;
        const raw = (el.textContent || "").trim();
        if (!raw) return;
        // Already patched and source unchanged? Skip.
        if (el.dataset[PATCHED_FLAG] === raw) return;
        const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
        if (parts.length === 0) return;
        if (!parts.every((p) => p in map)) return;
        const replaced = parts.map((p) => map[p]).join(", ");
        if (replaced === raw) return;
        el.textContent = replaced;
        el.dataset[PATCHED_FLAG] = raw;
      });
    });
  };

  let scheduled = false;
  const schedulePatch = (map) => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      patchCellsIn(document.body, map);
    });
  };

  fetchLabels().then((map) => {
    if (!map) return;
    schedulePatch(map);
    const observer = new MutationObserver(() => schedulePatch(map));
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  });
})();
