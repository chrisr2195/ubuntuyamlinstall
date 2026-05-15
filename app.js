// ─── State ───────────────────────────────────────────────────────────
let users = [];
let packages = [];
let snaps = [];
let lateCmds = [];
let earlyCmds = [];
let userCount = 0;
let lateCmdCount = 0;
let earlyCmdCount = 0;
let activeTab = 'preview';
const hashTimers = {};

// ─── Navigation ──────────────────────────────────────────────────────
function showSection(name) {
  document.querySelectorAll('.section-block').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.section-item').forEach(i => i.classList.remove('active'));
  document.getElementById('sec-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
  renderYAML();
}

// ─── Tab switching ────────────────────────────────────────────────────
function syncFromRaw() {
  const raw = document.getElementById('rawTextarea').value;
  updateStatus(raw);
}

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.yaml-tab').forEach((t, i) => {
    t.classList.toggle('active', (i === 0 && tab === 'preview') || (i === 1 && tab === 'raw'));
  });
  if (tab === 'raw') {
    document.getElementById('previewWrap').classList.add('hidden');
    document.getElementById('rawEditor').classList.add('active');
    document.getElementById('rawTextarea').value = buildYAML();
  } else {
    document.getElementById('previewWrap').classList.remove('hidden');
    document.getElementById('rawEditor').classList.remove('active');
    const raw = document.getElementById('rawTextarea').value;
    if (raw.trim()) loadYAMLText(raw, true);
    else renderYAML();
  }
}

// ─── Users ────────────────────────────────────────────────────────────
function addUser() {
  const id = ++userCount;
  users.push({ id });
  renderUserItem(id);
  renderYAML();
}

function renderUserItem(id) {
  const el = document.createElement('div');
  el.className = 'list-item';
  el.id = 'user-' + id;
  el.innerHTML = `
    <div class="list-item-header">
      <span class="list-item-title">User #${id}</span>
      <button class="btn-remove" onclick="removeUser(${id})">✕ Remove</button>
    </div>
    <div class="field-row triple">
      <div class="field"><label>Real Name</label><input type="text" id="u${id}-name" placeholder="John Doe" oninput="renderYAML()"></div>
      <div class="field"><label>Username</label><input type="text" id="u${id}-login" placeholder="john" oninput="renderYAML()"></div>
      <div class="field">
        <label>Password</label>
        <input type="password" id="u${id}-pw" placeholder="enter password to hash" oninput="scheduleHash(${id})" autocomplete="new-password">
        <input type="hidden" id="u${id}-pwhash">
        <div class="hash-status" id="u${id}-hashstatus"></div>
      </div>
    </div>
    <div class="toggle-row">
      <div><div class="toggle-label">Sudo Access</div></div>
      <label class="toggle"><input type="checkbox" id="u${id}-sudo" checked onchange="renderYAML()"><span class="toggle-slider"></span></label>
    </div>
  `;
  document.getElementById('usersList').appendChild(el);
}

// ─── Password hashing ─────────────────────────────────────────────────
function scheduleHash(id) {
  const statusEl = document.getElementById(`u${id}-hashstatus`);
  const pw = document.getElementById(`u${id}-pw`)?.value || '';
  if (!pw) {
    clearTimeout(hashTimers[id]);
    document.getElementById(`u${id}-pwhash`).value = '';
    if (statusEl) { statusEl.textContent = ''; statusEl.className = 'hash-status'; }
    renderYAML();
    return;
  }
  if (statusEl) { statusEl.textContent = '⟳ hashing…'; statusEl.className = 'hash-status hashing'; }
  clearTimeout(hashTimers[id]);
  hashTimers[id] = setTimeout(() => hashPassword(id), 400);
}

async function hashPassword(id) {
  const pw = document.getElementById(`u${id}-pw`)?.value || '';
  const hashEl   = document.getElementById(`u${id}-pwhash`);
  const statusEl = document.getElementById(`u${id}-hashstatus`);
  if (!pw) return;
  const bcryptLib = window.bcrypt || window.dcodeIO?.bcrypt;
  if (!bcryptLib) {
    if (statusEl) { statusEl.textContent = '⚠ bcrypt not loaded'; statusEl.className = 'hash-status'; }
    return;
  }
  try {
    const hash = await bcryptLib.hash(pw, 10);
    if (hashEl)   hashEl.value = hash;
    if (statusEl) { statusEl.textContent = '✓ hashed'; statusEl.className = 'hash-status ready'; }
    renderYAML();
  } catch (e) {
    if (statusEl) { statusEl.textContent = '⚠ hash failed'; statusEl.className = 'hash-status'; }
  }
}

function removeUser(id) {
  users = users.filter(u => u.id !== id);
  document.getElementById('user-' + id)?.remove();
  renderYAML();
}

// ─── Commands ─────────────────────────────────────────────────────────
function addLateCmd(prefill = '') {
  const id = ++lateCmdCount;
  lateCmds.push(id);
  const el = document.createElement('div');
  el.className = 'list-item'; el.id = 'lcmd-' + id;
  el.innerHTML = `
    <div class="list-item-header">
      <span class="list-item-title">Command #${id}</span>
      <button class="btn-remove" onclick="removeLateCmd(${id})">✕ Remove</button>
    </div>
    <div class="field-row full">
      <div class="field">
        <label>Shell Command</label>
        <input type="text" id="lcmd-val-${id}" placeholder="curtin in-target -- apt install -y htop" oninput="renderYAML()">
      </div>
    </div>
  `;
  document.getElementById('lateCommandsList').appendChild(el);
  if (prefill) document.getElementById(`lcmd-val-${id}`).value = prefill;
  renderYAML();
}

function removeLateCmd(id) {
  lateCmds = lateCmds.filter(x => x !== id);
  document.getElementById('lcmd-' + id)?.remove();
  renderYAML();
}

function addEarlyCmd(prefill = '') {
  const id = ++earlyCmdCount;
  earlyCmds.push(id);
  const el = document.createElement('div');
  el.className = 'list-item'; el.id = 'ecmd-' + id;
  el.innerHTML = `
    <div class="list-item-header">
      <span class="list-item-title">Early Command #${id}</span>
      <button class="btn-remove" onclick="removeEarlyCmd(${id})">✕ Remove</button>
    </div>
    <div class="field-row full">
      <div class="field">
        <input type="text" id="ecmd-val-${id}" placeholder="echo 'starting install'" oninput="renderYAML()">
      </div>
    </div>
  `;
  document.getElementById('earlyCommandsList').appendChild(el);
  if (prefill) document.getElementById(`ecmd-val-${id}`).value = prefill;
  renderYAML();
}

function removeEarlyCmd(id) {
  earlyCmds = earlyCmds.filter(x => x !== id);
  document.getElementById('ecmd-' + id)?.remove();
  renderYAML();
}

// ─── Storage helpers ─────────────────────────────────────────────────
function updateStorageOptions() {
  const layout = document.getElementById('storageLayout').value;
  const swapRow = document.getElementById('storageSwap').closest('.toggle-row');
  const swapChk = document.getElementById('storageSwap');
  const lvmOnly = layout === 'lvm';
  swapRow.classList.toggle('disabled', !lvmOnly);
  swapChk.disabled = !lvmOnly;
  if (!lvmOnly) swapChk.checked = false;
}

function handleVersionChange() {
  const ver = document.getElementById('ubuntuVersion').value;
  if (ver === '22.04 LTS') {
    document.getElementById('proKeyVersion').value = 'ubuntu-advantage';
  } else if (ver) {
    document.getElementById('proKeyVersion').value = 'ubuntu-pro';
  }
  renderYAML();
}

function handleFipsToggle(selected) {
  if (selected === 'fips-updates' && chk('proFipsUpdates')) {
    document.getElementById('proFips').checked = false;
  } else if (selected === 'fips' && chk('proFips')) {
    document.getElementById('proFipsUpdates').checked = false;
  }
}

// ─── Packages / Snaps ────────────────────────────────────────────────
function handlePkgKey(e) {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    if (val && !packages.includes(val)) {
      val.split(',').map(v => v.trim()).filter(Boolean).forEach(v => {
        if (!packages.includes(v)) packages.push(v);
      });
      e.target.value = '';
      renderChips('pkgChips', packages, 'pkg');
      renderYAML();
    }
  }
}

function handleSnapKey(e) {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    if (val && !snaps.includes(val)) {
      snaps.push(val);
      e.target.value = '';
      renderChips('snapChips', snaps, 'snap');
      renderYAML();
    }
  }
}

function renderChips(containerId, arr, type) {
  const c = document.getElementById(containerId);
  c.innerHTML = arr.map((v, i) => `
    <div class="chip">${v}<span class="chip-del" onclick="removeChip('${type}',${i})">×</span></div>
  `).join('');
}

function removeChip(type, idx) {
  if (type === 'pkg') { packages.splice(idx, 1); renderChips('pkgChips', packages, 'pkg'); }
  else { snaps.splice(idx, 1); renderChips('snapChips', snaps, 'snap'); }
  renderYAML();
}

// ─── YAML builder ────────────────────────────────────────────────────
function v(id) { return (document.getElementById(id)?.value || '').trim(); }
function chk(id) { return document.getElementById(id)?.checked || false; }

function buildYAML() {
  const lines = [];

  lines.push('#cloud-config');
  lines.push('autoinstall:');
  lines.push('  version: 1');
  const ubuntuVersion = v('ubuntuVersion');
  if (ubuntuVersion) lines.push(`  # target: Ubuntu ${ubuntuVersion}`);

  // Refresh installer (update the installer itself before running)
  const refreshInstall = v('refreshInstall');
  if (refreshInstall === 'yes') {
    lines.push('  refresh-installer:');
    lines.push('    update: yes');
  }

  // Identity
  const hostname = v('hostname');
  const tz = v('timezone');
  if (hostname || tz) {
    if (hostname) lines.push(`  hostname: ${hostname}`);
    if (tz) lines.push(`  timezone: ${tz}`);
  }

  // Locale
  const locale = v('locale');
  if (locale) lines.push(`  locale: ${locale}`);

  const kbLayout = v('kbLayout');
  if (kbLayout) {
    lines.push('  keyboard:');
    lines.push(`    layout: ${kbLayout}`);
    const kbVar = v('kbVariant');
    const kbTog = v('kbToggle');
    if (kbVar) lines.push(`    variant: ${kbVar}`);
    if (kbTog) lines.push(`    toggle: ${kbTog}`);
  }

  // Network
  const netIface  = v('netIface');
  const netDhcp4  = chk('netDhcp4');
  const netDhcp6  = chk('netDhcp6');
  const netStatic = v('netStaticIP');
  const netGw     = v('netGateway');
  const netDnsRaw = v('netDns');

  if (netIface) {
    lines.push('  network:');
    lines.push('    version: 2');
    lines.push('    ethernets:');
    lines.push(`      ${netIface}:`);
    lines.push(`        dhcp4: ${netDhcp4}`);
    lines.push(`        dhcp6: ${netDhcp6}`);
    if (!netDhcp4 && netStatic) {
      lines.push('        addresses:');
      lines.push(`          - ${netStatic}`);
    }
    if (!netDhcp4 && netGw) {
      // gateway4 is deprecated in netplan 0.103+ (Ubuntu 22.04+); use routes:
      lines.push('        routes:');
      lines.push('          - to: default');
      lines.push(`            via: ${netGw}`);
    }
    if (netDnsRaw) {
      const ns = netDnsRaw.split(',').map(s => s.trim()).filter(Boolean);
      lines.push('        nameservers:');
      lines.push(`          addresses: [${ns.join(', ')}]`);
    }
  }

  // Storage
  const storageLayout = v('storageLayout');
  const disk = v('storageDisk');
  const swap = chk('storageSwap');
  const wipe = chk('storageWipe');

  lines.push('  storage:');
  if (storageLayout === 'custom') {
    lines.push('    # Custom storage config — edit in Raw tab');
    lines.push('    config: []');
  } else {
    lines.push('    layout:');
    lines.push(`      name: ${storageLayout}`);
    if (wipe) lines.push('      wipe: superblock-recursive');
    if (disk) {
      lines.push('      match:');
      lines.push(`        path: ${disk}`);
    }
  }
  // swap: is a top-level autoinstall key, not nested under storage:
  if (!swap) {
    lines.push('  swap:');
    lines.push('    size: 0');
  }

  // user-data block — cloud-init config applied after first boot
  const pkgUpdate  = chk('pkgUpdate');
  const pkgUpgrade = chk('pkgUpgrade');
  const userItems  = users.map(u => u.id).filter(id => document.getElementById('u' + id + '-login'));
  const proToken   = v('proToken');
  const proKey     = v('proKeyVersion') || 'ubuntu-pro';
  const proSvcNames = ['fips-updates', 'fips', 'esm-infra', 'esm-apps', 'livepatch', 'usg', 'realtime-kernel'];
  const proSvcIds   = ['proFipsUpdates', 'proFips', 'proEsmInfra', 'proEsmApps', 'proLivepatch', 'proUsg', 'proRealtime'];
  const enabledSvcs = proSvcNames.filter((_, i) => chk(proSvcIds[i]));
  const hasPro      = !!(proToken || enabledSvcs.length);

  if (userItems.length > 0 || pkgUpdate || pkgUpgrade || hasPro) {
    lines.push('  user-data:');
    if (pkgUpdate)  lines.push('    package_update: true');
    if (pkgUpgrade) lines.push('    package_upgrade: true');
    if (userItems.length > 0) {
      lines.push('    users:');
      userItems.forEach(id => {
        const name  = v(`u${id}-name`);
        const login = v(`u${id}-login`);
        const pw    = v(`u${id}-pwhash`);
        const sudo  = chk(`u${id}-sudo`);
        if (login) {
          lines.push(`      - name: ${login}`);
          if (name) lines.push(`        gecos: ${name}`);
          if (pw)   lines.push(`        passwd: '${pw}'`);
          lines.push(`        lock-passwd: false`);
          if (sudo) {
            lines.push(`        groups: sudo`);
            lines.push(`        sudo: 'ALL=(ALL) NOPASSWD:ALL'`);
          }
          lines.push(`        shell: /bin/bash`);
        }
      });
    }
    if (hasPro) {
      lines.push(`    ${proKey}:`);
      if (proToken) lines.push(`      token: ${proToken}`);
      if (enabledSvcs.length) {
        lines.push('      enable:');
        enabledSvcs.forEach(s => lines.push(`        - ${s}`));
      }
    }
  }

  // SSH
  const sshInstall = chk('sshInstall');
  const sshPwdAuth = chk('sshPwdAuth');
  const sshKeys = v('sshKeys');

  if (sshInstall) {
    lines.push('  ssh:');
    lines.push('    install-server: true');
    if (!sshPwdAuth) lines.push('    allow-pw: false');
    if (sshKeys) {
      const keys = sshKeys.split('\n').map(k => k.trim()).filter(Boolean);
      if (keys.length) {
        lines.push('    authorized-keys:');
        keys.forEach(k => lines.push(`      - ${k}`));
      }
    }
  }

  // Packages (autoinstall key — installs during the installer run)
  if (packages.length) {
    lines.push('  packages:');
    packages.forEach(p => lines.push(`    - ${p}`));
  }

  // Snaps
  if (snaps.length) {
    lines.push('  snaps:');
    snaps.forEach(s => lines.push(`    - name: ${s}`));
  }

  // Apt
  const aptMirror = v('aptMirror');
  if (aptMirror) {
    lines.push('  apt:');
    lines.push('    primary:');
    lines.push('      - arches: [default]');
    lines.push(`        uri: ${aptMirror}`);
  }

  // Install source
  const installSource = v('installSource');
  if (installSource) {
    lines.push('  source:');
    lines.push(`    id: ${installSource}`);
  }

  // Early commands
  if (earlyCmds.length > 0) {
    const items = earlyCmds.filter(id => v(`ecmd-val-${id}`));
    if (items.length) {
      lines.push('  early-commands:');
      items.forEach(id => lines.push(`    - ${v(`ecmd-val-${id}`)}`));
    }
  }

  // Late commands
  if (lateCmds.length > 0) {
    const items = lateCmds.filter(id => v(`lcmd-val-${id}`));
    if (items.length) {
      lines.push('  late-commands:');
      items.forEach(id => lines.push(`    - ${v(`lcmd-val-${id}`)}`));
    }
  }

  // Interactive sections (pause installer for manual input on named sections)
  if (chk('interactive')) {
    lines.push('  interactive-sections:');
    lines.push('    - storage');
  }

  // Shutdown
  if (chk('reboot')) {
    lines.push('  shutdown: reboot');
  }

  // Custom yaml
  const customYaml = v('customYaml');
  if (customYaml) {
    lines.push('');
    lines.push('  # --- Custom YAML ---');
    customYaml.split('\n').forEach(l => lines.push('  ' + l));
  }

  return lines.join('\n');
}

// ─── Syntax highlighting ──────────────────────────────────────────────
function highlight(yaml) {
  return yaml
    .split('\n')
    .map(line => {
      if (line.startsWith('#')) return `<span class="y-comment">${esc(line)}</span>`;
      const m = line.match(/^(\s*)([\w\-]+)(:)(.*)$/);
      if (m) {
        const indent = m[1];
        const key = m[2];
        const colon = m[3];
        let rest = m[4];
        // highlight values
        rest = rest
          .replace(/:\s*(true)(\s*#.*)?$/, ': <span class="y-bool-true">$1</span>$2')
          .replace(/:\s*(false)(\s*#.*)?$/, ': <span class="y-bool-false">$1</span>$2')
          .replace(/:\s*(\d+)(\s*#.*)?$/, ': <span class="y-num">$1</span>$2')
          .replace(/:\s*('.*?')(\s*#.*)?$/, ': <span class="y-str">$1</span>$2')
          .replace(/:\s*(".*?")(\s*#.*)?$/, ': <span class="y-str">$1</span>$2')
          .replace(/:\s*([\w\-\/.@:]+)(\s*#.*)?$/, ': <span class="y-val">$1</span>$2');

        const keyClass = indent.length <= 2 ? 'y-section' : 'y-key';
        return `${indent}<span class="${keyClass}">${esc(key)}</span><span class="y-key">${colon}</span>${rest}`;
      }
      // list item
      if (/^\s*-\s/.test(line)) {
        return line.replace(/^(\s*)(-)(\s)(.*)$/, (_, sp, dash, space, rest) =>
          `${sp}<span class="y-dash">${dash}</span>${space}${esc(rest)}`
        );
      }
      return esc(line);
    })
    .join('\n');
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderYAML() {
  if (activeTab === 'raw') return;
  const yaml = buildYAML();
  document.getElementById('yamlOutput').innerHTML = highlight(yaml);
  updateStatus(yaml);
}

function updateStatus(yaml) {
  const lines = yaml.split('\n').length;
  const el = document.querySelector('.status-bar');
  if (el) el.querySelector('.status-text').textContent = `${lines} lines · autoinstall.yaml`;
  updateSectionCount();
}

function updateSectionCount() {
  const proIds = ['proFipsUpdates','proFips','proEsmInfra','proEsmApps','proLivepatch','proUsg','proRealtime'];
  const filled = [
    !!(v('hostname') || v('timezone')),
    !!(v('locale') || v('kbLayout')),
    !!v('netIface'),
    true,
    !!(users.length || chk('sshInstall')),
    !!(packages.length || snaps.length),
    !!(v('proToken') || proIds.some(id => chk(id))),
    !!(lateCmds.length || earlyCmds.length),
    !!(v('aptMirror') || v('installSource') || v('customYaml')),
  ].filter(Boolean).length;
  const el = document.getElementById('sectionCount');
  if (el) el.textContent = `${filled}/9`;
}

// ─── File I/O ─────────────────────────────────────────────────────────
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = evt => loadYAMLText(evt.target.result);
  r.readAsText(file);
});

// drag/drop
const dz = document.getElementById('dropZone');
dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
dz.addEventListener('drop', e => {
  e.preventDefault(); dz.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) { const r = new FileReader(); r.onload = ev => loadYAMLText(ev.target.result); r.readAsText(file); }
});

function loadYAMLText(text, silent = false) {
  document.getElementById('rawTextarea').value = text;

  let doc = null;
  try {
    doc = jsyaml.load(text);
  } catch(e) {
    showToast('⚠ YAML parse error — check Raw tab');
    switchTab('raw');
    return;
  }
  if (!doc || typeof doc !== 'object') { showToast('⚠ Empty or invalid YAML'); return; }

  // Support both bare autoinstall and #cloud-config-wrapped formats
  const ai = doc.autoinstall || doc;

  // ── Identity ──────────────────────────────────────────────────────────
  const hostname = ai.hostname || ai.identity?.hostname || '';
  document.getElementById('hostname').value = hostname;
  document.getElementById('timezone').value = ai.timezone || '';
  document.getElementById('locale').value    = ai.locale   || '';

  // ── Keyboard ──────────────────────────────────────────────────────────
  document.getElementById('kbLayout').value  = ai.keyboard?.layout  || '';
  updateKbVariants();
  document.getElementById('kbVariant').value = ai.keyboard?.variant || '';
  document.getElementById('kbToggle').value  = ai.keyboard?.toggle  || '';

  // ── Network ───────────────────────────────────────────────────────────
  // Handle both flat (autoinstall-style) and netplan-wrapped formats
  const net = ai.network;
  const ethernets = net?.ethernets || net?.network?.ethernets;
  if (ethernets) {
    const iface = Object.keys(ethernets)[0];
    if (iface) {
      document.getElementById('netIface').value = iface;
      const cfg = ethernets[iface];
      document.getElementById('netDhcp4').checked = cfg.dhcp4 !== false;
      document.getElementById('netDhcp6').checked = cfg.dhcp6 === true;
      if (Array.isArray(cfg.addresses) && cfg.addresses[0])
        document.getElementById('netStaticIP').value = cfg.addresses[0];
      // Support both modern routes: and legacy gateway4:
      let gw = cfg.gateway4 || '';
      if (!gw && Array.isArray(cfg.routes)) {
        const def = cfg.routes.find(r => r.to === 'default' || r.to === '0.0.0.0/0');
        if (def) gw = def.via || '';
      }
      document.getElementById('netGateway').value = gw;
      if (cfg.nameservers?.addresses) {
        const addrs = cfg.nameservers.addresses;
        document.getElementById('netDns').value = Array.isArray(addrs) ? addrs.join(', ') : addrs;
      }
    }
  }

  // ── Storage ───────────────────────────────────────────────────────────
  if (ai.storage?.layout) {
    const layout = ai.storage.layout;
    const sel = document.getElementById('storageLayout');
    if ([...sel.options].some(o => o.value === layout.name)) sel.value = layout.name;
    document.getElementById('storageDisk').value = layout.match?.path || '';
    document.getElementById('storageWipe').checked = layout.wipe === 'superblock-recursive';
  }
  // swap: size: 0 means swap disabled
  const swapDisabled = ai.swap?.size === 0 || String(ai.swap?.size) === '0';
  document.getElementById('storageSwap').checked = !swapDisabled;
  updateStorageOptions();

  // ── SSH ───────────────────────────────────────────────────────────────
  if (ai.ssh) {
    document.getElementById('sshInstall').checked  = ai.ssh['install-server'] !== false;
    document.getElementById('sshPwdAuth').checked  = ai.ssh['allow-pw'] !== false;
    if (Array.isArray(ai.ssh['authorized-keys']))
      document.getElementById('sshKeys').value = ai.ssh['authorized-keys'].join('\n');
  }

  // ── Packages ──────────────────────────────────────────────────────────
  packages = [];
  if (Array.isArray(ai.packages)) {
    packages = ai.packages.map(p => typeof p === 'string' ? p : Object.keys(p)[0]).filter(Boolean);
    renderChips('pkgChips', packages, 'pkg');
  }

  // ── Snaps ─────────────────────────────────────────────────────────────
  snaps = [];
  if (Array.isArray(ai.snaps)) {
    snaps = ai.snaps.map(s => typeof s === 'string' ? s : s.name).filter(Boolean);
    renderChips('snapChips', snaps, 'snap');
  }

  // ── Users (user-data.users or identity) ───────────────────────────────
  users = []; userCount = 0;
  document.getElementById('usersList').innerHTML = '';
  const ud = ai['user-data'] || {};
  let usersList = Array.isArray(ud.users) ? ud.users : [];
  // Also handle native identity: section (single primary user)
  if (!usersList.length && ai.identity?.username) {
    usersList = [{ name: ai.identity.username, gecos: ai.identity.realname, passwd: ai.identity.password }];
  }
  usersList.filter(u => u && u.name !== 'root').forEach(u => {
    const id = ++userCount;
    users.push({ id });
    renderUserItem(id);
    document.getElementById(`u${id}-login`).value = u.name  || '';
    document.getElementById(`u${id}-name`).value  = u.gecos || u.realname || '';
    document.getElementById(`u${id}-pw`).value    = '';
    const existHash = u.passwd || u.password || '';
    document.getElementById(`u${id}-pwhash`).value = existHash;
    const hSt = document.getElementById(`u${id}-hashstatus`);
    if (hSt) { hSt.textContent = existHash ? '✓ hash loaded' : ''; hSt.className = existHash ? 'hash-status ready' : 'hash-status'; }
    const hasSudo = u.sudo || (Array.isArray(u.groups) ? u.groups.includes('sudo') : u.groups === 'sudo');
    document.getElementById(`u${id}-sudo`).checked = !!hasSudo;
  });

  // ── package_update / package_upgrade (from user-data or top-level) ────
  document.getElementById('pkgUpdate').checked  = !!(ud.package_update  || doc.package_update);
  document.getElementById('pkgUpgrade').checked = !!(ud.package_upgrade || doc.package_upgrade);

  // ── Late commands ─────────────────────────────────────────────────────
  lateCmds = []; lateCmdCount = 0;
  document.getElementById('lateCommandsList').innerHTML = '';
  if (Array.isArray(ai['late-commands'])) {
    ai['late-commands'].forEach(cmd => {
      addLateCmd(Array.isArray(cmd) ? cmd.join(' ') : String(cmd));
    });
  }

  // ── Early commands ────────────────────────────────────────────────────
  earlyCmds = []; earlyCmdCount = 0;
  document.getElementById('earlyCommandsList').innerHTML = '';
  if (Array.isArray(ai['early-commands'])) {
    ai['early-commands'].forEach(cmd => {
      addEarlyCmd(Array.isArray(cmd) ? cmd.join(' ') : String(cmd));
    });
  }

  // ── Ubuntu Pro / ubuntu-advantage (under user-data; top-level as fallback) ──
  const proData = ud['ubuntu-pro'] || ud['ubuntu-advantage'] || ai['ubuntu-pro'] || ai['ubuntu-advantage'];
  const proKeySource = ud['ubuntu-pro'] || ai['ubuntu-pro'] ? 'ubuntu-pro' : 'ubuntu-advantage';
  if (proData) {
    document.getElementById('proToken').value = proData.token || '';
    document.getElementById('proKeyVersion').value = proKeySource;
    const enabled = Array.isArray(proData.enable) ? proData.enable : [];
    document.getElementById('proFipsUpdates').checked = enabled.includes('fips-updates');
    document.getElementById('proFips').checked         = enabled.includes('fips');
    document.getElementById('proEsmInfra').checked     = enabled.includes('esm-infra');
    document.getElementById('proEsmApps').checked      = enabled.includes('esm-apps');
    document.getElementById('proLivepatch').checked    = enabled.includes('livepatch');
    document.getElementById('proUsg').checked          = enabled.includes('usg');
    document.getElementById('proRealtime').checked     = enabled.includes('realtime-kernel');
  }

  // ── Apt ───────────────────────────────────────────────────────────────
  document.getElementById('aptMirror').value = ai.apt?.primary?.[0]?.uri || '';

  // ── Source ────────────────────────────────────────────────────────────
  document.getElementById('installSource').value = ai.source?.id || '';

  // ── Misc ──────────────────────────────────────────────────────────────
  document.getElementById('reboot').checked      = ai.shutdown === 'reboot';
  document.getElementById('interactive').checked = Array.isArray(ai['interactive-sections']) && ai['interactive-sections'].length > 0;
  const ri = ai['refresh-installer'];
  document.getElementById('refreshInstall').value =
    (ri?.update === 'yes' || ri?.update === true) ? 'yes' : '';

  if (!silent) showToast('✓ YAML loaded');
  renderYAML();
}

function newFile() {
  if (!confirm('Clear all fields and start a new file?')) return;
  document.querySelectorAll('input[type="text"], input[type="password"], textarea').forEach(el => el.value = '');
  const defaultChecked = new Set(['netDhcp4','sshInstall','sshPwdAuth','pkgUpdate','storageSwap','reboot']);
  document.querySelectorAll('input[type="checkbox"]').forEach(el => { el.checked = defaultChecked.has(el.id); });
  document.getElementById('proKeyVersion').value = 'ubuntu-pro';
  packages = []; snaps = []; users = []; lateCmds = []; earlyCmds = [];
  renderChips('pkgChips', packages, 'pkg');
  renderChips('snapChips', snaps, 'snap');
  document.getElementById('usersList').innerHTML = '';
  document.getElementById('lateCommandsList').innerHTML = '';
  document.getElementById('earlyCommandsList').innerHTML = '';
  userCount = lateCmdCount = earlyCmdCount = 0;
  updateStorageOptions();
  renderYAML();
}

function downloadYAML() {
  const yaml = activeTab === 'raw'
    ? document.getElementById('rawTextarea').value
    : buildYAML();
  const blob = new Blob([yaml], { type: 'text/yaml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'autoinstall.yaml';
  a.click();
  showToast('⬇ Downloaded autoinstall.yaml');
}

function copyYAML() {
  const yaml = activeTab === 'raw'
    ? document.getElementById('rawTextarea').value
    : buildYAML();
  navigator.clipboard.writeText(yaml).then(() => showToast('⎘ Copied to clipboard!'));
}

// ─── Toast ────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// ─── Init ─────────────────────────────────────────────────────────────
initLocaleDatelist();
initLayoutDatelist();
initToggleDatelist();
document.getElementById('hostname').value = 'ubuntu-server';
document.getElementById('locale').value = 'en_US.UTF-8';
document.getElementById('kbLayout').value = 'us';
updateKbVariants();
document.getElementById('netIface').value = 'enp0s3';
document.getElementById('netDhcp4').checked = true;
updateStorageOptions();
renderYAML();
