# ⚙️ Ubuntu Autoinstall YAML Editor

A lightweight, browser-based editor for creating and validating [Ubuntu Autoinstall](https://ubuntu.com/server/docs/install/autoinstall) (`autoinstall.yaml`) configuration files — no server required, no install, no build step.

![Ubuntu](https://img.shields.io/badge/Ubuntu-20.04%20%7C%2022.04%20%7C%2024.04-E95420?style=flat-square&logo=ubuntu&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-Static-58a6ff?style=flat-square&logo=html5&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-3fb950?style=flat-square)

---

## ✨ Features

- **9 configuration sections** covering all major autoinstall directives
- **Live YAML preview** with syntax highlighting as you type
- **Raw Edit tab** for direct YAML manipulation — pastes round-trip back to the form
- **Load existing files** via drag-and-drop or file picker
- **Download** the finished `autoinstall.yaml` or copy it to clipboard
- **Smart autocomplete** for locale and keyboard layout fields, backed by curated Ubuntu/XKB data
- **DHCPv4 and DHCPv6** toggles with correct netplan output
- **Ubuntu Pro** support — token, YAML key version (`ubuntu-pro` / `ubuntu-advantage`), and per-service enable flags (FIPS, ESM, Livepatch, USG, realtime-kernel)
- **Live bcrypt password hashing** — password fields are masked and hashed in-browser; cleartext never appears in the YAML output
- No npm, no build tools — serve the four static files from any web server or local `python3 -m http.server`

---

## 🖥️ Screenshot

> _A dark-themed three-panel layout: section navigator → form editor → live YAML preview_

---

## 📁 File Structure

```
ubuntu-yaml-editor.html   # Main application shell
app.js                    # All application logic and YAML builder
style.css                 # Styles
locale-data.js            # Curated locale and XKB keyboard layout data
```

The editor loads two CDN libraries at runtime (requires internet access, or self-host them):
- [`js-yaml`](https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js) — YAML parse/validate
- [`bcryptjs`](https://cdnjs.cloudflare.com/ajax/libs/bcryptjs/2.4.3/bcrypt.min.js) — in-browser password hashing

---

## 🚀 Usage

### Option A — Open directly

All four files live in the same directory, so browsers load them correctly over `file://` with no server needed:

```bash
git clone https://github.com/your-username/ubuntu-autoinstall-editor.git

open ubuntu-yaml-editor.html          # macOS
xdg-open ubuntu-yaml-editor.html      # Linux
start ubuntu-yaml-editor.html         # Windows
```

> **Note:** password hashing and YAML parsing require the two CDN libraries (`bcryptjs`, `js-yaml`). An internet connection is needed on first load unless you self-host them.

### Option B — Serve locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080/ubuntu-yaml-editor.html
```

### Option C — GitHub Pages

Fork this repo and enable **GitHub Pages** on the `main` branch. The editor will be live at:
```
https://your-username.github.io/ubuntu-autoinstall-editor/ubuntu-yaml-editor.html
```

### Option D — Any static web server

Drop all four files (`ubuntu-yaml-editor.html`, `app.js`, `style.css`, `locale-data.js`) into any web server directory — nginx, Apache, Caddy, or an S3/GCS bucket with static hosting.

---

## 📋 Configuration Sections

| Section | Directives Covered |
|---|---|
| **Identity** | `hostname`, `timezone`, Ubuntu version, `refresh-installer` |
| **Locale & Keyboard** | `locale`, `keyboard.layout`, `variant`, `toggle` — autocomplete from curated lists |
| **Network** | `network` (netplan v2), DHCPv4, DHCPv6, static IP/CIDR, gateway, DNS |
| **Storage** | `storage.layout` (LVM, ZFS, direct, custom), target disk, wipe, swap |
| **Users & SSH** | `user-data.users` with live bcrypt hashing, `ssh` (server, password auth, authorized keys) |
| **Packages** | `packages`, `snaps`, `package_update`, `package_upgrade` |
| **Ubuntu Pro** | `ubuntu-pro` / `ubuntu-advantage` token, per-service enable (fips-updates, fips, esm-infra, esm-apps, livepatch, usg, realtime-kernel) |
| **Commands** | `early-commands`, `late-commands` |
| **Misc** | `shutdown`, `interactive-sections`, `apt` mirror, `source`, custom YAML block |

---

## 📦 Loading an Existing File

Drag and drop any existing `autoinstall.yaml` onto the **drop zone** in the Identity section, or click it to browse. The editor will parse and populate all form fields automatically. Switch to the **Raw Edit** tab to paste or hand-edit YAML directly; switching back to Preview round-trips the raw content through the form.

---

## 🗂️ Output Format

The generated file follows the [Ubuntu Autoinstall reference](https://ubuntu.com/server/docs/install/autoinstall-reference) schema and starts with the required `#cloud-config` header:

```yaml
#cloud-config
autoinstall:
  version: 1
  # target: Ubuntu 24.04 LTS
  hostname: ubuntu-server
  locale: en_US.UTF-8
  keyboard:
    layout: us
  network:
    version: 2
    ethernets:
      enp0s3:
        dhcp4: true
        dhcp6: false
  storage:
    layout:
      name: lvm
  ssh:
    install-server: true
  user-data:
    users:
      - name: admin
        gecos: Admin User
        passwd: '$2b$10$...'
        lock-passwd: false
        groups: sudo
        sudo: 'ALL=(ALL) NOPASSWD:ALL'
        shell: /bin/bash
    ubuntu-pro:
      token: C1AUbuntu0ProT0ken
      enable:
        - fips-updates
        - esm-infra
```

---

## 🔧 Deploying the Generated File

Place `autoinstall.yaml` on a web server or USB drive accessible during Ubuntu installation. When booting the Ubuntu installer, pass the autoinstall URL on the kernel command line:

```
autoinstall ds=nocloud-net;s=http://your-server/
```

For local USB-based installs, place it alongside a `meta-data` file (can be empty) in the root of a FAT32 partition labeled `CIDATA`.

---

## 🤝 Contributing

Pull requests are welcome. For larger changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please test changes in at least one modern browser before submitting. There is no build step — the files you edit are the files that ship.

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---


---

## 🔗 Resources

- [Ubuntu Autoinstall Documentation](https://ubuntu.com/server/docs/install/autoinstall)
- [Autoinstall Reference](https://ubuntu.com/server/docs/install/autoinstall-reference)
- [Netplan Documentation](https://netplan.io/reference)
- [Cloud-init Docs](https://cloudinit.readthedocs.io/)
- [Ubuntu Pro](https://ubuntu.com/pro)
