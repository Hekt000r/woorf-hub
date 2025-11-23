import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const PROGRAMS = [
  // Office & Productivity
  {
    name: "LibreOffice",
    description: "A powerful office suite – its clean interface and feature-rich tools help you unleash your creativity.",
    tags: ["Office", "Productivity"],
    link: "https://www.libreoffice.org/",
    image: "/icons/libreoffice.png", // Modified from external URL
    alternativesTo: ["Microsoft Word", "Word", "Microsoft Office", "Excel", "PowerPoint"],
  },
  {
    name: "Apache OpenOffice",
    description: "The free and open productivity suite with word processor, spreadsheet, and presentation software.",
    tags: ["Office", "Productivity"],
    link: "https://www.openoffice.org/",
    image: "/icons/openoffice.png",
    alternativesTo: ["Microsoft Office", "Word", "Excel"],
  },
  {
    name: "OnlyOffice",
    description: "A comprehensive office suite for document editing and collaboration in the cloud.",
    tags: ["Office", "Productivity", "Collaboration"],
    link: "https://www.onlyoffice.com/",
    image: "/icons/onlyoffice.png",
    alternativesTo: ["Microsoft Office", "Google Workspace"],
  },

  // Graphics & Design
  {
    name: "GIMP",
    description: "A cross-platform image editor available for GNU/Linux, OS X, Windows and more.",
    tags: ["Design", "Image Editor"],
    link: "https://www.gimp.org/",
    image: "/icons/gimp.png",
    alternativesTo: ["Adobe Photoshop", "Photoshop"],
  },
  {
    name: "Inkscape",
    description: "A professional vector graphics editor for Windows, Mac OS X and Linux.",
    tags: ["Design", "Vector"],
    link: "https://inkscape.org/",
    image: "/icons/inkscape.png",
    alternativesTo: ["Adobe Illustrator", "CorelDRAW"],
  },
  {
    name: "Krita",
    description: "A professional free and open source painting program made by artists for artists.",
    tags: ["Design", "Painting", "Art"],
    link: "https://krita.org/",
    image: "/icons/krita.png",
    alternativesTo: ["Adobe Photoshop", "Corel Painter"],
  },

  // 3D & Animation
  {
    name: "Blender",
    description: "Free and open source 3D creation suite. It supports the entirety of the 3D pipeline.",
    tags: ["3D", "Animation", "Modeling"],
    link: "https://www.blender.org/",
    image: "/icons/blender.png",
    alternativesTo: ["Maya", "Cinema 4D", "3ds Max"],
  },

  // Audio & Video
  {
    name: "VLC Media Player",
    description: "A free and open source cross-platform multimedia player and framework that plays most multimedia files.",
    tags: ["Video", "Audio", "Player"],
    link: "https://www.videolan.org/vlc/",
    image: "/icons/vlc.png",
    alternativesTo: ["Windows Media Player", "QuickTime"],
  },
  {
    name: "Audacity",
    description: "Free, open source, cross-platform audio software for multi-track recording and editing.",
    tags: ["Audio", "Editing", "Recording"],
    link: "https://www.audacityteam.org/",
    image: "/icons/audacity.png",
    alternativesTo: ["Adobe Audition", "GarageBand", "Logic Pro"],
  },
  {
    name: "OBS Studio",
    description: "Free and open source software for video recording and live streaming.",
    tags: ["Video", "Streaming", "Recording"],
    link: "https://obsproject.com/",
    image: "/icons/obs-studio.png", // Adjusted for uniqueness
    alternativesTo: ["XSplit", "Streamlabs"],
  },
  {
    name: "Shotcut",
    description: "A free, open source, cross-platform video editor.",
    tags: ["Video", "Editing"],
    link: "https://shotcut.org/",
    image: "/icons/shotcut.png",
    alternativesTo: ["Adobe Premiere Pro", "Final Cut Pro"],
  },
  {
    name: "Kdenlive",
    description: "A powerful free and open source cross-platform video editing program.",
    tags: ["Video", "Editing"],
    link: "https://kdenlive.org/",
    image: "/icons/kdenlive.png",
    alternativesTo: ["Adobe Premiere Pro", "Final Cut Pro"],
  },

  // Communication & Collaboration
  {
    name: "Rocket.Chat",
    description: "Open source team communication platform with real-time chat, video conferencing, and file sharing.",
    tags: ["Communication", "Collaboration", "Chat"],
    link: "https://rocket.chat/",
    image: "/icons/rocket-chat.png", // Adjusted
    alternativesTo: ["Slack", "Microsoft Teams"],
  },
  {
    name: "Mattermost",
    description: "Open source platform for secure collaboration across the entire software development lifecycle.",
    tags: ["Communication", "Collaboration"],
    link: "https://mattermost.com/",
    image: "/icons/mattermost.png",
    alternativesTo: ["Slack", "Microsoft Teams"],
  },
  {
    name: "Jitsi Meet",
    description: "Secure, fully featured, and completely free video conferencing software.",
    tags: ["Video", "Communication", "Conferencing"],
    link: "https://jitsi.org/",
    image: "/icons/jitsi-meet.png", // Adjusted
    alternativesTo: ["Zoom", "Google Meet", "Microsoft Teams"],
  },
  {
    name: "Thunderbird",
    description: "A free email application that's easy to set up and customize.",
    tags: ["Email", "Communication"],
    link: "https://www.thunderbird.net/",
    image: "/icons/thunderbird.png",
    alternativesTo: ["Microsoft Outlook", "Apple Mail"],
  },

  // Development Tools
  {
    name: "VS Code",
    description: "A lightweight but powerful source code editor with built-in support for JavaScript, TypeScript and Node.js.",
    tags: ["Development", "IDE", "Editor"],
    link: "https://code.visualstudio.com/",
    image: "/icons/vscode.png",
    alternativesTo: ["Sublime Text", "Atom"],
  },
  {
    name: "GitLab",
    description: "A complete DevOps platform delivered as a single application for version control and CI/CD.",
    tags: ["Development", "DevOps", "Git"],
    link: "https://about.gitlab.com/",
    image: "/icons/gitlab.png",
    alternativesTo: ["GitHub", "Bitbucket"],
  },
  {
    name: "Docker",
    description: "An open platform for developing, shipping, and running applications in containers.",
    tags: ["Development", "DevOps", "Containers"],
    link: "https://www.docker.com/",
    image: "/icons/docker.png",
    alternativesTo: ["Podman"],
  },
  {
    name: "PostgreSQL",
    description: "A powerful, open source object-relational database system.",
    tags: ["Database", "Development"],
    link: "https://www.postgresql.org/",
    image: "/icons/postgresql.png",
    alternativesTo: ["Oracle Database", "Microsoft SQL Server"],
  },
  {
    name: "MariaDB",
    description: "A community-developed, commercially supported fork of the MySQL relational database.",
    tags: ["Database", "Development"],
    link: "https://mariadb.org/",
    image: "/icons/mariadb.png",
    alternativesTo: ["MySQL", "Oracle Database"],
  },

  // Operating Systems
  {
    name: "Ubuntu",
    description: "The leading Linux distribution for desktops, servers, and the cloud.",
    tags: ["Operating System", "Linux"],
    link: "https://ubuntu.com/",
    image: "/icons/ubuntu.png",
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "Fedora",
    description: "An innovative, free, and open source platform for hardware, clouds, and containers.",
    tags: ["Operating System", "Linux"],
    link: "https://getfedora.org/",
    image: "/icons/fedora.png",
    alternativesTo: ["Windows", "macOS"],
  },

  // Security & Privacy
  {
    name: "KeePassXC",
    description: "A cross-platform community-driven port of the Windows application Keepass Password Safe.",
    tags: ["Security", "Password Manager"],
    link: "https://keepassxc.org/",
    image: "/icons/keepassxc.png",
    alternativesTo: ["LastPass", "1Password", "Bitwarden"],
  },
  {
    name: "Bitwarden",
    description: "Open source password management solution for individuals, teams, and business organizations.",
    tags: ["Security", "Password Manager"],
    link: "https://bitwarden.com/",
    image: "/icons/bitwarden.png",
    alternativesTo: ["LastPass", "1Password"],
  },

  // Web Browsers
  {
    name: "Firefox",
    description: "A fast, privacy-focused browser from Mozilla.",
    tags: ["Browser", "Privacy"],
    link: "https://www.mozilla.org/firefox/",
    image: "/icons/firefox.png",
    alternativesTo: ["Google Chrome", "Microsoft Edge"],
  },
  {
    name: "Brave",
    description: "A privacy-focused browser that blocks ads and trackers by default.",
    tags: ["Browser", "Privacy"],
    link: "https://brave.com/",
    image: "/icons/brave.png",
    alternativesTo: ["Google Chrome", "Safari"],
  },

  // Analytics & Business
  {
    name: "Plausible",
    description: "Simple, open-source, lightweight analytics alternative to Google Analytics.",
    tags: ["Analytics", "Privacy"],
    link: "https://plausible.io/",
    image: "/icons/plausible.png",
    alternativesTo: ["Google Analytics"],
  },
  {
    name: "GanttProject",
    description: "Free project management application for managing projects and creating schedules.",
    tags: ["Project Management", "Productivity"],
    link: "https://www.ganttproject.biz/",
    image: "/icons/ganttproject.png",
    alternativesTo: ["Microsoft Project"],
  },

  // Game Development
  {
    name: "Godot Engine",
    description: "A feature-packed, cross-platform game engine to create 2D and 3D games.",
    tags: ["Game Development", "3D", "2D"],
    link: "https://godotengine.org/",
    image: "/icons/godot-engine.png", // Adjusted
    alternativesTo: ["Unity", "Unreal Engine"],
  },

  // Note-Taking
  {
    name: "Joplin",
    description: "An open source note-taking and to-do application with synchronization capabilities.",
    tags: ["Notes", "Productivity"],
    link: "https://joplinapp.org/",
    image: "/icons/joplin.png",
    alternativesTo: ["Evernote", "OneNote"],
  },
  {
    name: "Obsidian",
    description: "A powerful knowledge base that works on top of local plain-text Markdown files.",
    tags: ["Notes", "Productivity", "Knowledge Base"],
    link: "https://obsidian.md/",
    image: "/icons/obsidian.png",
    alternativesTo: ["Notion", "Roam Research"],
  },

  // Operating Systems (Linux, BSD, etc.)
  {
    name: "Debian",
    description: "The Universal Operating System.",
    tags: ["Operating System", "Linux"],
    link: "https://www.debian.org/",
    image: "/icons/debian.png", // Modified
    alternativesTo: ["Windows", "macOS", "Ubuntu"],
  },
  {
    name: "Arch Linux",
    description: "A lightweight and flexible Linux distribution that tries to Keep It Simple.",
    tags: ["Operating System", "Linux"],
    link: "https://archlinux.org/",
    image: "/icons/arch-linux.png", // Modified
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "Manjaro",
    description: "A professionally made Linux based operating system that is a suitable replacement for Windows or macOS.",
    tags: ["Operating System", "Linux"],
    link: "https://manjaro.org/",
    image: "/icons/manjaro.png", // Modified
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "Linux Mint",
    description: "A modern, elegant and comfortable operating system which is both powerful and easy to use.",
    tags: ["Operating System", "Linux"],
    link: "https://linuxmint.com/",
    image: "/icons/linux-mint.png", // Modified
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "Pop!_OS",
    description: "An operating system for STEM and creative professionals who use their computer as a tool to discover and create.",
    tags: ["Operating System", "Linux"],
    link: "https://pop.system76.com/",
    image: "/icons/pop-os.png", // Modified, simplified name
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "OpenSUSE",
    description: "The makers' choice for sysadmins, developers and desktop users.",
    tags: ["Operating System", "Linux"],
    link: "https://www.opensuse.org/",
    image: "/icons/opensuse.png", // Modified
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "EndeavourOS",
    description: "A terminal-centric distro with a vibrant and friendly community.",
    tags: ["Operating System", "Linux"],
    link: "https://endeavouros.com/",
    image: "/icons/endeavouros.png", // Modified
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "Kali Linux",
    description: "The most advanced Penetration Testing Distribution.",
    tags: ["Operating System", "Linux", "Security"],
    link: "https://www.kali.org/",
    image: "/icons/kali-linux.png", // Modified
    alternativesTo: ["Windows"],
  },
  {
    name: "Parrot OS",
    description: "The all-in-one framework for Cyber Security, Software Development and Privacy Defense.",
    tags: ["Operating System", "Linux", "Security"],
    link: "https://parrotsec.org/",
    image: "/icons/parrot-os.png", // Modified
    alternativesTo: ["Windows"],
  },
  {
    name: "elementary OS",
    description: "The thoughtful, capable, and ethical replacement for Windows and macOS.",
    tags: ["Operating System", "Linux"],
    link: "https://elementary.io/",
    image: "/icons/elementary-os.png", // Modified
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "Zorin OS",
    description: "The alternative to Windows and macOS designed to make your computer faster, more powerful, secure, and privacy-respecting.",
    tags: ["Operating System", "Linux"],
    link: "https://zorin.com/os/",
    image: "/icons/zorin-os.png", // Modified
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "Slackware",
    description: "The oldest surviving Linux distribution.",
    tags: ["Operating System", "Linux"],
    link: "http://www.slackware.com/",
    image: "/icons/slackware.png", // Modified
    alternativesTo: ["Windows"],
  },
  {
    name: "Gentoo",
    description: "A highly flexible, source-based Linux distribution.",
    tags: ["Operating System", "Linux"],
    link: "https://www.gentoo.org/",
    image: "/icons/gentoo.png", // Modified
    alternativesTo: ["Windows"],
  },
  {
    name: "Void Linux",
    description: "A general purpose operating system, based on the monolithic Linux kernel.",
    tags: ["Operating System", "Linux"],
    link: "https://voidlinux.org/",
    image: "/icons/void-linux.png", // Modified
    alternativesTo: ["Windows"],
  },
  {
    name: "NixOS",
    description: "A Linux distribution built on top of the Nix package manager.",
    tags: ["Operating System", "Linux"],
    link: "https://nixos.org/",
    image: "/icons/nixos.png", // Modified
    alternativesTo: ["Windows"],
  },
  {
    name: "OpenBSD",
    description: "A FREE, multi-platform 4.4BSD-based UNIX-like operating system.",
    tags: ["Operating System", "BSD"],
    link: "https://www.openbsd.org/",
    image: "/icons/openbsd.png", // Modified
    alternativesTo: ["Windows", "Linux"],
  },
  {
    name: "FreeBSD",
    description: "An operating system used to power modern servers, desktops, and embedded platforms.",
    tags: ["Operating System", "BSD"],
    link: "https://www.freebsd.org/",
    image: "/icons/freebsd.png", // Modified
    alternativesTo: ["Windows", "Linux"],
  },
  {
    name: "NetBSD",
    description: "A free, fast, secure, and highly portable Unix-like Open Source operating system.",
    tags: ["Operating System", "BSD"],
    link: "https://www.netbsd.org/",
    image: "/icons/netbsd.png", // Modified
    alternativesTo: ["Windows", "Linux"],
  },
  {
    name: "ReactOS",
    description: "A free and open-source operating system compatible with Windows applications and drivers.",
    tags: ["Operating System"],
    link: "https://reactos.org/",
    image: "/icons/reactos.png", // Modified
    alternativesTo: ["Windows"],
  },

  // Web Browsers
  {
    name: "Chromium",
    description: "An open-source browser project that aims to build a safer, faster, and more stable way for all users to experience the web.",
    tags: ["Browser"],
    link: "https://www.chromium.org/Home",
    image: "/icons/chromium.png", // Modified
    alternativesTo: ["Google Chrome"],
  },
  {
    name: "Ungoogled-Chromium",
    description: "Google Chromium, sans integration with Google.",
    tags: ["Browser", "Privacy"],
    link: "https://github.com/ungoogled-software/ungoogled-chromium",
    image: "/icons/ungoogled-chromium.png", // Modified, simplified name
    alternativesTo: ["Google Chrome"],
  },
  {
    name: "Vivaldi",
    description: "A browser with a focus on customization and privacy.",
    tags: ["Browser"],
    link: "https://vivaldi.com/",
    image: "/icons/vivaldi.png", // Modified
    alternativesTo: ["Google Chrome"],
  },
  {
    name: "Waterfox",
    description: "The privacy-focused web browser.",
    tags: ["Browser", "Privacy"],
    link: "https://www.waterfox.net/",
    image: "/icons/waterfox.png", // Modified
    alternativesTo: ["Google Chrome", "Firefox"],
  },
  {
    name: "LibreWolf",
    description: "A custom version of Firefox, focused on privacy, security and freedom.",
    tags: ["Browser", "Privacy"],
    link: "https://librewolf.net/",
    image: "/icons/librewolf.png", // Modified
    alternativesTo: ["Firefox", "Google Chrome"],
  },
  {
    name: "Pale Moon",
    description: "An Open Source, Goanna-based web browser focused on efficiency and customization.",
    tags: ["Browser"],
    link: "https://www.palemoon.org/",
    image: "/icons/pale-moon.png", // Modified
    alternativesTo: ["Firefox", "Google Chrome"],
  },
  {
    name: "Tor Browser",
    description: "Protect your privacy. Defend yourself against network surveillance and traffic analysis.",
    tags: ["Browser", "Privacy", "Security"],
    link: "https://www.torproject.org/",
    image: "/icons/tor-browser.png", // Modified
    alternativesTo: ["Google Chrome"],
  },

  // Security & Privacy Tools
  {
    name: "Veracrypt",
    description: "Free open source disk encryption software for Windows, Mac OSX and Linux.",
    tags: ["Security", "Encryption"],
    link: "https://www.veracrypt.fr/",
    image: "/icons/veracrypt.png", // Modified
    alternativesTo: ["BitLocker"],
  },
  {
    name: "OpenVPN",
    description: "A full-featured open source SSL VPN solution.",
    tags: ["Security", "VPN"],
    link: "https://openvpn.net/",
    image: "/icons/openvpn.png", // Modified
    alternativesTo: ["Cisco AnyConnect"],
  },
  {
    name: "WireGuard",
    description: "A fast, modern, secure VPN tunnel.",
    tags: ["Security", "VPN"],
    link: "https://www.wireguard.com/",
    image: "/icons/wireguard.png", // Modified
    alternativesTo: ["OpenVPN", "IPsec"],
  },
  {
    name: "Pi-hole",
    description: "A black hole for Internet advertisements.",
    tags: ["Security", "Privacy", "Network"],
    link: "https://pi-hole.net/",
    image: "/icons/pi-hole.png", // Modified
    alternativesTo: ["AdBlock"],
  },
  {
    name: "Qubes OS",
    description: "A reasonably secure operating system.",
    tags: ["Security", "Operating System"],
    link: "https://www.qubes-os.org/",
    image: "/icons/qubes-os.png", // Modified
    alternativesTo: ["Windows", "Tails"],
  },
  {
    name: "Tails",
    description: "A portable operating system that protects against surveillance and censorship.",
    tags: ["Security", "Privacy", "Operating System"],
    link: "https://tails.boum.org/",
    image: "/icons/tails.png", // Modified
    alternativesTo: ["Windows"],
  },
  {
    name: "ClamAV",
    description: "An open source antivirus engine for detecting trojans, viruses, malware & other malicious threats.",
    tags: ["Security", "Antivirus"],
    link: "https://www.clamav.net/",
    image: "/icons/clamav.png", // Modified
    alternativesTo: ["Norton", "McAfee"],
  },
  {
    name: "Fail2ban",
    description: "Scans log files and bans IPs that show the malicious signs.",
    tags: ["Security"],
    link: "https://www.fail2ban.org/",
    image: "/icons/fail2ban.png", // Modified
    alternativesTo: ["CrowdStrike"],
  },
  {
    name: "rkhunter",
    description: "Rootkit Hunter is a security monitoring and analyzing tool.",
    tags: ["Security"],
    link: "http://rkhunter.sourceforge.net/",
    image: "/icons/rkhunter.png", // Modified
    alternativesTo: ["Rootkit Revealer"],
  },
  {
    name: "OpenSnitch",
    description: "A GNU/Linux port of the Little Snitch application firewall.",
    tags: ["Security", "Firewall"],
    link: "https://github.com/evilsocket/opensnitch",
    image: "/icons/opensnitch.png", // Modified
    alternativesTo: ["Little Snitch", "GlassWire"],
  },

  // Development Tools
  {
    name: "Eclipse IDE",
    description: "A platform for open collaboration and innovation.",
    tags: ["Development", "IDE"],
    link: "https://www.eclipse.org/ide/",
    image: "/icons/eclipse-ide.png", // Modified
    alternativesTo: ["IntelliJ IDEA", "Visual Studio"],
  },
  {
    name: "IntelliJ IDEA Community",
    description: "The Capable and Ergonomic IDE for JVM.",
    tags: ["Development", "IDE"],
    link: "https://www.jetbrains.com/idea/",
    image: "/icons/intellij-idea-community.png", // Modified
    alternativesTo: ["Eclipse"],
  },
  {
    name: "NetBeans",
    description: "Fits the pieces together. Quickly and easily develop desktop, mobile and web applications.",
    tags: ["Development", "IDE"],
    link: "https://netbeans.apache.org/",
    image: "/icons/netbeans.png", // Modified
    alternativesTo: ["Eclipse", "IntelliJ IDEA"],
  },
  {
    name: "PyCharm Community",
    description: "The Python IDE for Professional Developers.",
    tags: ["Development", "IDE"],
    link: "https://www.jetbrains.com/pycharm/",
    image: "/icons/pycharm-community.png", // Modified
    alternativesTo: ["VS Code"],
  },
  {
    name: "Geany",
    description: "A powerful, stable and lightweight programmer's text editor.",
    tags: ["Development", "Editor"],
    link: "https://www.geany.org/",
    image: "/icons/geany.png", // Modified
    alternativesTo: ["Notepad++"],
  },
  {
    name: "Atom",
    description: "A hackable text editor for the 21st Century.",
    tags: ["Development", "Editor"],
    link: "https://github.com/atom/atom",
    image: "/icons/atom.png", // Modified
    alternativesTo: ["VS Code", "Sublime Text"],
  },
  {
    name: "Neovim",
    description: "Hyperextensible Vim-based text editor.",
    tags: ["Development", "Editor"],
    link: "https://neovim.io/",
    image: "/icons/neovim.png", // Modified
    alternativesTo: ["VS Code", "Sublime Text"],
  },
  {
    name: "Vim",
    description: "A highly configurable text editor built to make creating and changing any kind of text very efficient.",
    tags: ["Development", "Editor"],
    link: "https://www.vim.org/",
    image: "/icons/vim.png", // Modified
    alternativesTo: ["VS Code", "Sublime Text"],
  },
  {
    name: "Emacs",
    description: "An extensible, customizable, free/libre text editor — and more.",
    tags: ["Development", "Editor"],
    link: "https://www.gnu.org/software/emacs/",
    image: "/icons/emacs.png", // Modified
    alternativesTo: ["VS Code", "Sublime Text"],
  },
  {
    name: "GNU Make",
    description: "A tool which controls the generation of executables and other non-source files of a program.",
    tags: ["Development"],
    link: "https://www.gnu.org/software/make/",
    image: "/icons/gnu-make.png", // Modified
    alternativesTo: ["CMake", "Gradle"],
  },
  {
    name: "CMake",
    description: "An open-source, cross-platform family of tools designed to build, test and package software.",
    tags: ["Development"],
    link: "https://cmake.org/",
    image: "/icons/cmake.png", // Modified
    alternativesTo: ["Make", "Gradle"],
  },
  {
    name: "GCC",
    description: "The GNU Compiler Collection.",
    tags: ["Development", "Compiler"],
    link: "https://gcc.gnu.org/",
    image: "/icons/gcc.png", // Modified
    alternativesTo: ["Clang", "MSVC"],
  },
  {
    name: "Clang",
    description: "A compiler front end for the C, C++, Objective-C and Objective-C++ programming languages.",
    tags: ["Development", "Compiler"],
    link: "https://clang.llvm.org/",
    image: "/icons/clang.png", // Modified
    alternativesTo: ["GCC", "MSVC"],
  },
  {
    name: "Git",
    description: "A free and open source distributed version control system.",
    tags: ["Development", "Git"],
    link: "https://git-scm.com/",
    image: "/icons/git.png", // Modified
    alternativesTo: ["SVN", "Mercurial"],
  },
  {
    name: "Mercurial",
    description: "A free, distributed source control management tool.",
    tags: ["Development", "Git"],
    link: "https://www.mercurial-scm.org/",
    image: "/icons/mercurial.png", // Modified
    alternativesTo: ["Git", "SVN"],
  },
  {
    name: "Gitea",
    description: "Git with a cup of tea. A painless self-hosted Git service.",
    tags: ["Development", "Git", "DevOps"],
    link: "https://gitea.io/",
    image: "/icons/gitea.png", // Modified
    alternativesTo: ["GitHub", "GitLab"],
  },
  {
    name: "Forgejo",
    description: "A self-hosted lightweight software forge.",
    tags: ["Development", "Git", "DevOps"],
    link: "https://forgejo.org/",
    image: "/icons/forgejo.png", // Modified
    alternativesTo: ["GitHub", "GitLab"],
  },
  {
    name: "Minikube",
    description: "Run Kubernetes locally.",
    tags: ["Development", "DevOps", "Containers"],
    link: "https://minikube.sigs.k8s.io/",
    image: "/icons/minikube.png", // Modified
    alternativesTo: ["Docker Desktop"],
  },
  {
    name: "Kubernetes",
    description: "Production-Grade Container Orchestration.",
    tags: ["Development", "DevOps", "Containers"],
    link: "https://kubernetes.io/",
    image: "/icons/kubernetes.png", // Modified
    alternativesTo: ["Docker Swarm"],
  },
  {
    name: "Ansible",
    description: "Radically simple IT automation.",
    tags: ["Development", "DevOps"],
    link: "https://www.ansible.com/",
    image: "/icons/ansible.png", // Modified
    alternativesTo: ["Terraform", "Puppet"],
  },
  {
    name: "Terraform",
    description: "Automate infrastructure on any cloud with Terraform.",
    tags: ["Development", "DevOps"],
    link: "https://www.terraform.io/",
    image: "/icons/terraform.png", // Modified
    alternativesTo: ["Ansible", "Pulumi"],
  },

  // Databases / Data Tools
  {
    name: "SQLite",
    description: "A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.",
    tags: ["Database", "Development"],
    link: "https://www.sqlite.org/index.html",
    image: "/icons/sqlite.png", // Modified
    alternativesTo: ["PostgreSQL", "MySQL"],
  },
  {
    name: "MongoDB Community",
    description: "The source-available cross-platform document-oriented database program.",
    tags: ["Database", "Development"],
    link: "https://www.mongodb.com/try/download/community",
    image: "/icons/mongodb-community.png", // Modified
    alternativesTo: ["CouchDB"],
  },
  {
    name: "Redis",
    description: "The open source, in-memory data store used by millions of developers as a database, cache, streaming engine, and message broker.",
    tags: ["Database", "Development"],
    link: "https://redis.io/",
    image: "/icons/redis.png", // Modified
    alternativesTo: ["Memcached"],
  },
  {
    name: "Cassandra",
    description: "Manage massive amounts of data, fast, without losing sleep.",
    tags: ["Database", "Development"],
    link: "https://cassandra.apache.org/",
    image: "/icons/cassandra.png", // Modified
    alternativesTo: ["HBase"],
  },
  {
    name: "CockroachDB",
    description: "The most evolved database on the planet.",
    tags: ["Database", "Development"],
    link: "https://www.cockroachlabs.com/",
    image: "/icons/cockroachdb.png", // Modified
    alternativesTo: ["Spanner"],
  },
  {
    name: "TimescaleDB",
    description: "PostgreSQL for time-series and events.",
    tags: ["Database", "Development"],
    link: "https://www.timescale.com/",
    image: "/icons/timescaledb.png", // Modified
    alternativesTo: ["InfluxDB"],
  },
  {
    name: "DuckDB",
    description: "An in-process SQL OLAP Database Management System.",
    tags: ["Database", "Development"],
    link: "https://duckdb.org/",
    image: "/icons/duckdb.png", // Modified
    alternativesTo: ["SQLite"],
  },
  {
    name: "InfluxDB",
    description: "The platform for building time series applications.",
    tags: ["Database", "Development"],
    link: "https://www.influxdata.com/",
    image: "/icons/influxdb.png", // Modified
    alternativesTo: ["TimescaleDB"],
  },

  // Analytics / Business
  {
    name: "Metabase",
    description: "The easy, open source way for everyone in your company to ask questions and learn from data.",
    tags: ["Analytics", "Business"],
    link: "https://www.metabase.com/",
    image: "/icons/metabase.png", // Modified
    alternativesTo: ["Tableau", "PowerBI"],
  },
  {
    name: "Redash",
    description: "Connect to any data source, easily visualize, dashboard and share your data.",
    tags: ["Analytics", "Business"],
    link: "https://redash.io/",
    image: "/icons/redash.png", // Modified
    alternativesTo: ["Tableau", "PowerBI"],
  },
  {
    name: "OpenProject",
    description: "The leading open source project management software.",
    tags: ["Business", "Project Management"],
    link: "https://www.openproject.org/",
    image: "/icons/openproject.png", // Modified
    alternativesTo: ["Jira", "Asana"],
  },
  {
    name: "EspoCRM",
    description: "Open Source CRM application.",
    tags: ["Business", "CRM"],
    link: "https://www.espocrm.com/",
    image: "/icons/espocrm.png", // Modified
    alternativesTo: ["Salesforce", "HubSpot"],
  },
  {
    name: "SuiteCRM",
    description: "The world's number 1 Open Source CRM.",
    tags: ["Business", "CRM"],
    link: "https://suitecrm.com/",
    image: "/icons/suitecrm.png", // Modified
    alternativesTo: ["Salesforce", "HubSpot"],
  },
  {
    name: "ERPNext",
    description: "The world's best 100% open source ERP.",
    tags: ["Business", "ERP"],
    link: "https://erpnext.com/",
    image: "/icons/erpnext.png", // Modified
    alternativesTo: ["SAP", "Oracle NetSuite"],
  },
  {
    name: "Odoo Community",
    description: "Amazing employees deserve amazing software.",
    tags: ["Business", "ERP", "CRM"],
    link: "https://www.odoo.com/",
    image: "/icons/odoo-community.png", // Modified
    alternativesTo: ["SAP", "Salesforce"],
  },
  {
    name: "Kimai",
    description: "A free & open source timetracker.",
    tags: ["Business", "Productivity"],
    link: "https://www.kimai.org/",
    image: "/icons/kimai.png", // Modified
    alternativesTo: ["Toggl"],
  },

  // Note-Taking / Knowledge Management
  {
    name: "Turtl",
    description: "A secure, encrypted place to keep your notes, passwords, bookmarks, and pictures.",
    tags: ["Notes", "Privacy"],
    link: "https://turtlapp.com/",
    image: "/icons/turtl.png", // Modified
    alternativesTo: ["Evernote"],
  },
  {
    name: "Standard Notes",
    description: "A free, open-source, and completely encrypted notes app.",
    tags: ["Notes", "Privacy"],
    link: "https://standardnotes.com/",
    image: "/icons/standard-notes.png", // Modified
    alternativesTo: ["Evernote", "OneNote"],
  },
  {
    name: "Logseq",
    description: "A privacy-first, open-source knowledge base.",
    tags: ["Notes", "Knowledge Base"],
    link: "https://logseq.com/",
    image: "/icons/logseq.png", // Modified
    alternativesTo: ["Roam Research", "Obsidian"],
  },
  {
    name: "Zettlr",
    description: "A Markdown Editor for the 21st century.",
    tags: ["Notes", "Writing"],
    link: "https://www.zettlr.com/",
    image: "/icons/zettlr.png", // Modified
    alternativesTo: ["Ulysses"],
  },
  {
    name: "Trilium Notes",
    description: "Build your personal knowledge base with Trilium Notes.",
    tags: ["Notes", "Knowledge Base"],
    link: "https://github.com/zadam/trilium",
    image: "/icons/trilium-notes.png", // Modified
    alternativesTo: ["Evernote", "OneNote"],
  },
  {
    name: "Laverna",
    description: "A JavaScript note taking application with Markdown editor and encryption support.",
    tags: ["Notes", "Privacy"],
    link: "https://laverna.cc/",
    image: "/icons/laverna.png", // Modified
    alternativesTo: ["Evernote"],
  },

  // Graphics, Art & Design
  {
    name: "Darktable",
    description: "An open source photography workflow application and raw developer.",
    tags: ["Design", "Photography"],
    link: "https://www.darktable.org/",
    image: "/icons/darktable.png", // Modified
    alternativesTo: ["Adobe Lightroom"],
  },
  {
    name: "RawTherapee",
    description: "A powerful, cross-platform raw photo processing system.",
    tags: ["Design", "Photography"],
    link: "https://www.rawtherapee.com/",
    image: "/icons/rawtherapee.png", // Modified
    alternativesTo: ["Adobe Lightroom"],
  },
  {
    name: "MyPaint",
    description: "A nimble, distraction-free, and easy tool for digital painters.",
    tags: ["Design", "Painting"],
    link: "http://mypaint.org/",
    image: "/icons/mypaint.png", // Modified
    alternativesTo: ["Corel Painter"],
  },
  {
    name: "Pencil2D",
    description: "An easy, intuitive tool to make 2D hand-drawn animations.",
    tags: ["Design", "Animation"],
    link: "https://www.pencil2d.org/",
    image: "/icons/pencil2d.png", // Modified
    alternativesTo: ["Toon Boom"],
  },
  {
    name: "Synfig Studio",
    description: "Open-source 2D animation software.",
    tags: ["Design", "Animation"],
    link: "https://www.synfig.org/",
    image: "/icons/Synfig",
    alternativesTo: ["Adobe Animate"],
  },
  {
    name: "OpenToonz",
    description: "Open-source animation production software.",
    tags: ["Design", "Animation"],
    link: "https://opentoonz.github.io/e/",
    image: "/icons/OpenToonz",
    alternativesTo: ["Toon Boom"],
  },
  {
    name: "Natron",
    description: "Open Source Compositing Software for VFX and Motion Graphics.",
    tags: ["Design", "VFX"],
    link: "https://natrongithub.github.io/",
    image: "/icons/Natron",
    alternativesTo: ["Adobe After Effects", "Nuke"],
  },
  {
    name: "ImageMagick",
    description: "Create, edit, compose, or convert bitmap images.",
    tags: ["Design", "Image Editor"],
    link: "https://imagemagick.org/",
    image: "/icons/ImageMagick",
    alternativesTo: ["Photoshop (for batch processing)"],
  },
  {
    name: "Shotwell",
    description: "A personal photo manager for the GNOME desktop environment.",
    tags: ["Design", "Photography"],
    link: "https://wiki.gnome.org/Apps/Shotwell",
    image: "/icons/Shotwell",
    alternativesTo: ["Google Photos"],
  },

  // Video Tools
  {
    name: "OpenShot",
    description: "An award-winning free and open-source video editor.",
    tags: ["Video", "Editing"],
    link: "https://www.openshot.org/",
    image: "/icons/OpenShot",
    alternativesTo: ["Adobe Premiere Pro"],
  },
  {
    name: "Olive Video Editor",
    description: "Professional open-source non-linear video editor.",
    tags: ["Video", "Editing"],
    link: "https://olivevideoeditor.org/",
    image: "/icons/Olive",
    alternativesTo: ["Adobe Premiere Pro"],
  },
  {
    name: "Avidemux",
    description: "A free video editor designed for simple cutting, filtering and encoding tasks.",
    tags: ["Video", "Editing"],
    link: "http://avidemux.sourceforge.net/",
    image: "/icons/Avidemux",
    alternativesTo: ["VirtualDub"],
  },
  {
    name: "HandBrake",
    description: "The open source video transcoder.",
    tags: ["Video", "Transcoder"],
    link: "https://handbrake.fr/",
    image: "/icons/HandBrake",
    alternativesTo: ["Adobe Media Encoder"],
  },
  {
    name: "FFmpeg",
    description: "A complete, cross-platform solution to record, convert and stream audio and video.",
    tags: ["Video", "Audio", "CLI"],
    link: "https://ffmpeg.org/",
    image: "/icons/FFmpeg",
    alternativesTo: ["Adobe Media Encoder"],
  },
  {
    name: "MKVToolNix",
    description: "A set of tools to create, alter and inspect Matroska files.",
    tags: ["Video", "Tools"],
    link: "https://mkvtoolnix.download/",
    image: "/icons/MKVToolNix",
    alternativesTo: ["MP4Box"],
  },

  // Audio Tools
  {
    name: "LMMS",
    description: "Let's make music. Cross-platform music production software.",
    tags: ["Audio", "DAW"],
    link: "https://lmms.io/",
    image: "/icons/LMMS.png",
    alternativesTo: ["FL Studio"],
  },
  {
    name: "Ardour",
    description: "Record, Edit, and Mix on Linux, macOS and Windows.",
    tags: ["Audio", "DAW"],
    link: "https://ardour.org/",
    image: "/icons/Ardour.png",
    alternativesTo: ["Pro Tools"],
  },
  {
    name: "Hydrogen",
    description: "An advanced drum machine for GNU/Linux.",
    tags: ["Audio", "Music"],
    link: "http://hydrogen-music.org/",
    image: "/icons/Hydrogen.png",
    alternativesTo: ["EZDrummer"],
  },
  {
    name: "Mixxx",
    description: "Free DJ Mixing Software.",
    tags: ["Audio", "DJ"],
    link: "https://mixxx.org/",
    image: "/icons/Mixxx.png",
    alternativesTo: ["Virtual DJ"],
  },
  {
    name: "MuseScore",
    description: "Create, play and print beautiful sheet music.",
    tags: ["Audio", "Notation"],
    link: "https://musescore.org/",
    image: "/icons/MuseScore.png",
    alternativesTo: ["Sibelius", "Finale"],
  },
  {
    name: "Tenacity",
    description: "An easy-to-use, cross-platform multi-track audio editor/recorder.",
    tags: ["Audio", "Editing"],
    link: "https://tenacityaudio.org/",
    image: "/icons/Tenacity.png",
    alternativesTo: ["Audacity"],
  },

  // Gaming / Emulation
  {
    name: "PCSX2",
    description: "A free and open-source PlayStation 2 (PS2) emulator.",
    tags: ["Gaming", "Emulator"],
    link: "https://pcsx2.net/",
    image: "/icons/PCSX2.png",
    alternativesTo: ["PS2 Console"],
  },
  {
    name: "RPCS3",
    description: "The world's first free and open-source PlayStation 3 emulator/debugger.",
    tags: ["Gaming", "Emulator"],
    link: "https://rpcs3.net/",
    image: "/icons/RPCS3",
    alternativesTo: ["PS3 Console"],
  },
  {
    name: "Dolphin Emulator",
    description: "A GameCube and Wii emulator.",
    tags: ["Gaming", "Emulator"],
    link: "https://dolphin-emu.org/",
    image: "/icons/Dolphin",
    alternativesTo: ["GameCube", "Wii"],
  },
  {
    name: "Ryujinx",
    description: "A simple, experimental Nintendo Switch emulator.",
    tags: ["Gaming", "Emulator"],
    link: "https://ryujinx.org/",
    image: "/icons/Ryujinx",
    alternativesTo: ["Nintendo Switch"],
  },
  {
    name: "PPSSPP",
    description: "A PSP emulator for Android, Windows, Mac and Linux.",
    tags: ["Gaming", "Emulator"],
    link: "https://www.ppsspp.org/",
    image: "/icons/PPSSPP",
    alternativesTo: ["PSP"],
  },
  {
    name: "MAME",
    description: "Multiple Arcade Machine Emulator.",
    tags: ["Gaming", "Emulator"],
    link: "https://www.mamedev.org/",
    image: "/icons/MAME",
    alternativesTo: ["Arcade Machines"],
  },
  {
    name: "RetroArch",
    description: "Frontend for emulators, game engines and media players.",
    tags: ["Gaming", "Emulator"],
    link: "https://www.retroarch.com/",
    image: "/icons/RetroArch",
    alternativesTo: ["LaunchBox"],
  },
  {
    name: "OpenTTD",
    description: "An open source simulation game based upon Transport Tycoon Deluxe.",
    tags: ["Gaming", "Simulation"],
    link: "https://www.openttd.org/",
    image: "/icons/OpenTTD",
    alternativesTo: ["Transport Tycoon"],
  },
  {
    name: "0 A.D.",
    description: "A free, open-source, real-time strategy game of ancient warfare.",
    tags: ["Gaming", "Strategy"],
    link: "https://play0ad.com/",
    image: "/icons/0AD",
    alternativesTo: ["Age of Empires"],
  },
  {
    name: "SuperTux",
    description: "A classic 2D jump'n run sidescroller game.",
    tags: ["Gaming", "Platformer"],
    link: "https://www.supertux.org/",
    image: "/icons/SuperTux",
    alternativesTo: ["Super Mario Bros"],
  },
  {
    name: "Minetest",
    description: "An open source voxel game engine.",
    tags: ["Gaming", "Sandbox"],
    link: "https://www.minetest.net/",
    image: "/icons/Minetest",
    alternativesTo: ["Minecraft"],
  },

  // System Utilities
  {
    name: "BleachBit",
    description: "Clean your system and free disk space.",
    tags: ["Utilities", "System"],
    link: "https://www.bleachbit.org/",
    image: "/icons/BleachBit",
    alternativesTo: ["CCleaner"],
  },
  {
    name: "Htop",
    description: "An interactive process viewer.",
    tags: ["Utilities", "System"],
    link: "https://htop.dev/",
    image: "/icons/Htop",
    alternativesTo: ["Task Manager"],
  },
  {
    name: "qBittorrent",
    description: "An open-source software alternative to µTorrent.",
    tags: ["Utilities", "Network"],
    link: "https://www.qbittorrent.org/",
    image: "/icons/qBittorrent",
    alternativesTo: ["uTorrent"],
  },
  {
    name: "Transmission",
    description: "A Fast, Easy and Free BitTorrent Client.",
    tags: ["Utilities", "Network"],
    link: "https://transmissionbt.com/",
    image: "/icons/Transmission",
    alternativesTo: ["uTorrent"],
  },
  {
    name: "Syncthing",
    description: "A continuous file synchronization program.",
    tags: ["Utilities", "Network"],
    link: "https://syncthing.net/",
    image: "/icons/Syncthing",
    alternativesTo: ["Dropbox", "Google Drive"],
  },
  {
    name: "Rsync",
    description: "A fast, versatile, remote (and local) file-copying tool.",
    tags: ["Utilities", "System"],
    link: "https://rsync.samba.org/",
    image: "/icons/Rsync",
    alternativesTo: ["Robocopy"],
  },
  {
    name: "Ventoy",
    description: "A new bootable USB solution.",
    tags: ["Utilities", "System"],
    link: "https://www.ventoy.net/",
    image: "/icons/Ventoy",
    alternativesTo: ["Rufus"],
  },
  {
    name: "Clonezilla",
    description: "Partition and disk imaging/cloning program.",
    tags: ["Utilities", "System"],
    link: "https://clonezilla.org/",
    image: "/icons/Clonezilla",
    alternativesTo: ["Norton Ghost"],
  },
  {
    name: "Timeshift",
    description: "System restore tool for Linux.",
    tags: ["Utilities", "System"],
    link: "https://github.com/teejee2008/timeshift",
    image: "/icons/Timeshift",
    alternativesTo: ["System Restore"],
  },
  {
    name: "Redshift",
    description: "Adjusts the color temperature of your screen according to your surroundings.",
    tags: ["Utilities", "System"],
    link: "http://jonls.dk/redshift/",
    image: "/icons/Redshift",
    alternativesTo: ["f.lux"],
  },
  {
    name: "GNOME Tweaks",
    description: "Customize your GNOME desktop.",
    tags: ["Utilities", "System"],
    link: "https://wiki.gnome.org/Apps/Tweaks",
    image: "/icons/GNOME",
    alternativesTo: ["Windows Settings"],
  },
  {
    name: "KDE Plasma",
    description: "A powerful, multi-platform and open-source desktop environment.",
    tags: ["Utilities", "Desktop Environment"],
    link: "https://kde.org/plasma-desktop/",
    image: "/icons/KDE",
    alternativesTo: ["Windows Desktop"],
  },
  {
    name: "XFCE",
    description: "A lightweight desktop environment for UNIX-like operating systems.",
    tags: ["Utilities", "Desktop Environment"],
    link: "https://xfce.org/",
    image: "/icons/XFCE",
    alternativesTo: ["Windows Desktop"],
  },
  {
    name: "LXQt",
    description: "A lightweight Qt desktop environment.",
    tags: ["Utilities", "Desktop Environment"],
    link: "https://lxqt-project.org/",
    image: "/icons/LXQt",
    alternativesTo: ["Windows Desktop"],
  },

  // Networking Tools
  {
    name: "Wireshark",
    description: "The world's foremost network protocol analyzer.",
    tags: ["Networking", "Security"],
    link: "https://www.wireshark.org/",
    image: "/icons/Wireshark",
    alternativesTo: ["Fiddler"],
  },
  {
    name: "Nmap",
    description: "Free and open source utility for network discovery and security auditing.",
    tags: ["Networking", "Security"],
    link: "https://nmap.org/",
    image: "/icons/Nmap",
    alternativesTo: ["Angry IP Scanner"],
  },
  {
    name: "IPFS",
    description: "A peer-to-peer hypermedia protocol.",
    tags: ["Networking", "Web"],
    link: "https://ipfs.tech/",
    image: "/icons/IPFS",
    alternativesTo: ["HTTP"],
  },
  {
    name: "Caddy",
    description: "The Ultimate Server with automatic HTTPS.",
    tags: ["Networking", "Web Server"],
    link: "https://caddyserver.com/",
    image: "/icons/Caddy",
    alternativesTo: ["NGINX", "Apache"],
  },
  {
    name: "NGINX",
    description: "High Performance Load Balancer, Web Server, & Reverse Proxy.",
    tags: ["Networking", "Web Server"],
    link: "https://www.nginx.com/",
    image: "/icons/NGINX",
    alternativesTo: ["Apache", "IIS"],
  },
  {
    name: "Apache HTTP Server",
    description: "The number one HTTP server on the Internet.",
    tags: ["Networking", "Web Server"],
    link: "https://httpd.apache.org/",
    image: "/icons/Apache",
    alternativesTo: ["NGINX", "IIS"],
  },
  {
    name: "pfSense",
    description: "The world's most trusted open source firewall.",
    tags: ["Networking", "Firewall"],
    link: "https://www.pfsense.org/",
    image: "/icons/pfSense",
    alternativesTo: ["Cisco ASA"],
  },
  {
    name: "OPNsense",
    description: "High-end security made easy.",
    tags: ["Networking", "Firewall"],
    link: "https://opnsense.org/",
    image: "/icons/OPNsense",
    alternativesTo: ["pfSense"],
  },

  // Cloud / Self-Hosting
  {
    name: "Nextcloud",
    description: "The most popular self-hosted collaboration platform.",
    tags: ["Cloud", "Storage"],
    link: "https://nextcloud.com/",
    image: "/icons/Nextcloud.png",
    alternativesTo: ["Google Drive", "Dropbox"],
  },
  {
    name: "OwnCloud",
    description: "Secure file sharing and content collaboration.",
    tags: ["Cloud", "Storage"],
    link: "https://owncloud.com/",
    image: "/icons/OwnCloud.png",
    alternativesTo: ["Google Drive", "Dropbox"],
  },
  {
    name: "Seafile",
    description: "High performance file syncing and sharing.",
    tags: ["Cloud", "Storage"],
    link: "https://www.seafile.com/",
    image: "/icons/Seafile.png",
    alternativesTo: ["Google Drive", "Dropbox"],
  },
  {
    name: "MinIO",
    description: "High Performance Object Storage.",
    tags: ["Cloud", "Storage"],
    link: "https://min.io/",
    image: "/icons/MinIO.png",
    alternativesTo: ["AWS S3"],
  },
  {
    name: "Home Assistant",
    description: "Open source home automation that puts local control and privacy first.",
    tags: ["Cloud", "IoT"],
    link: "https://www.home-assistant.io/",
    image: "/icons/HomeAssistant.png",
    alternativesTo: ["Google Home", "Apple HomeKit"],
  },
  {
    name: "Node-RED",
    description: "Low-code programming for event-driven applications.",
    tags: ["Cloud", "IoT"],
    link: "https://nodered.org/",
    image: "/icons/Node-RED.png",
    alternativesTo: ["IFTTT"],
  },
  {
    name: "Portainer",
    description: "Container management made simple.",
    tags: ["Cloud", "DevOps"],
    link: "https://www.portainer.io/",
    image: "/icons/Portainer.png",
    alternativesTo: ["Rancher"],
  },
  {
    name: "Firefly III",
    description: "A free and open source personal finance manager.",
    tags: ["Cloud", "Finance"],
    link: "https://www.firefly-iii.org/",
    image: "/icons/Firefly.png",
    alternativesTo: ["Mint", "YNAB"],
  },

  // Education / Science
  {
    name: "GNU Octave",
    description: "Scientific programming language.",
    tags: ["Education", "Science"],
    link: "https://www.gnu.org/software/octave/",
    image: "/icons/Octave",
    alternativesTo: ["MATLAB"],
  },
  {
    name: "SageMath",
    description: "Open Source Mathematics Software.",
    tags: ["Education", "Math"],
    link: "https://www.sagemath.org/",
    image: "/icons/SageMath",
    alternativesTo: ["Mathematica", "Maple"],
  },
  {
    name: "Scilab",
    description: "Free and open source software for numerical computation.",
    tags: ["Education", "Science"],
    link: "https://www.scilab.org/",
    image: "/icons/Scilab",
    alternativesTo: ["MATLAB"],
  },
  {
    name: "RStudio",
    description: "Open source and enterprise-ready professional software for R.",
    tags: ["Education", "Statistics"],
    link: "https://www.rstudio.com/",
    image: "/icons/RStudio",
    alternativesTo: ["SPSS"],
  },
  {
    name: "KiCad",
    description: "A Cross Platform and Open Source Electronics Design Automation Suite.",
    tags: ["Education", "Engineering"],
    link: "https://www.kicad.org/",
    image: "/icons/KiCad",
    alternativesTo: ["Altium Designer"],
  },
  {
    name: "FreeCAD",
    description: "Your own 3D parametric modeler.",
    tags: ["Education", "Engineering"],
    link: "https://www.freecad.org/",
    image: "/icons/FreeCAD",
    alternativesTo: ["AutoCAD", "SolidWorks"],
  },
  {
    name: "GeoGebra",
    description: "Free online math tools for graphing, geometry, 3D, and more.",
    tags: ["Education", "Math"],
    link: "https://www.geogebra.org/",
    image: "/icons/GeoGebra",
    alternativesTo: ["Desmos"],
  },

  // File Managers
  {
    name: "Double Commander",
    description: "A cross platform open source file manager with two panels side by side.",
    tags: ["Utilities", "File Manager"],
    link: "https://doublecmd.sourceforge.io/",
    image: "/icons/DoubleCmd",
    alternativesTo: ["Total Commander"],
  },
  {
    name: "Krusader",
    description: "Advanced Twin-Panel File Manager for KDE Plasma.",
    tags: ["Utilities", "File Manager"],
    link: "https://krusader.org/",
    image: "/icons/Krusader",
    alternativesTo: ["Total Commander"],
  },
  {
    name: "Nemo",
    description: "The file manager for the Cinnamon desktop environment.",
    tags: ["Utilities", "File Manager"],
    link: "https://github.com/linuxmint/nemo",
    image: "/icons/Nemo",
    alternativesTo: ["Windows Explorer"],
  },
  {
    name: "Caja",
    description: "The file manager for the MATE desktop environment.",
    tags: ["Utilities", "File Manager"],
    link: "https://github.com/mate-desktop/caja",
    image: "/icons/Caja",
    alternativesTo: ["Windows Explorer"],
  },
  {
    name: "PCManFM",
    description: "Extremely fast and lightweight file manager.",
    tags: ["Utilities", "File Manager"],
    link: "https://wiki.lxde.org/en/PCManFM",
    image: "/icons/PCManFM",
    alternativesTo: ["Windows Explorer"],
  },

  // Miscellaneous Useful Tools
  {
    name: "KeePass",
    description: "A free open source password manager.",
    tags: ["Security", "Password Manager"],
    link: "https://keepass.info/",
    image: "/icons/KeePass",
    alternativesTo: ["LastPass"],
  },
  {
    name: "Keeweb",
    description: "Free cross-platform password manager compatible with KeePass.",
    tags: ["Security", "Password Manager"],
    link: "https://keeweb.info/",
    image: "/icons/Keeweb",
    alternativesTo: ["LastPass"],
  },
  {
    name: "Zulip",
    description: "The world's most productive team chat.",
    tags: ["Communication", "Chat"],
    link: "https://zulip.com/",
    image: "/icons/Zulip",
    alternativesTo: ["Slack"],
  },
  {
    name: "Synapse",
    description: "Matrix reference homeserver.",
    tags: ["Communication", "Server"],
    link: "https://github.com/matrix-org/synapse",
    image: "/icons/Synapse",
    alternativesTo: ["Discord Server"],
  },
  {
    name: "Element",
    description: "A glossy Matrix collaboration client for the web.",
    tags: ["Communication", "Chat"],
    link: "https://element.io/",
    image: "/icons/Element",
    alternativesTo: ["Discord", "Slack"],
  },
  {
    name: "Calibre",
    description: "The one stop solution for all your e-book needs.",
    tags: ["Utilities", "E-book"],
    link: "https://calibre-ebook.com/",
    image: "/icons/Calibre",
    alternativesTo: ["Kindle App"],
  },
  {
    name: "Foliate",
    description: "A simple and modern eBook viewer for Linux desktops.",
    tags: ["Utilities", "E-book"],
    link: "https://johnfactotum.github.io/foliate/",
    image: "/icons/Foliate",
    alternativesTo: ["Kindle App"],
  },
  {
    name: "mpv",
    description: "A free, open source, and cross-platform media player.",
    tags: ["Video", "Player"],
    link: "https://mpv.io/",
    image: "/icons/mpv",
    alternativesTo: ["VLC", "Windows Media Player"],
  },
  {
    name: "qView",
    description: "Practical and minimal image viewer.",
    tags: ["Design", "Viewer"],
    link: "https://interversehq.com/qview/",
    image: "/icons/qView",
    alternativesTo: ["Windows Photos"],
  },
  {
    name: "PeaZip",
    description: "Free Zip / Unzip software and Rar file extractor.",
    tags: ["Utilities", "Compression"],
    link: "https://peazip.github.io/",
    image: "/icons/PeaZip",
    alternativesTo: ["WinRAR"],
  },
  {
    name: "7-Zip",
    description: "A file archiver with a high compression ratio.",
    tags: ["Utilities", "Compression"],
    link: "https://www.7-zip.org/",
    image: "/icons/7-Zip",
    alternativesTo: ["WinRAR"],
  },
  {
    name: "FileZilla",
    description: "The free FTP solution.",
    tags: ["Networking", "FTP"],
    link: "https://filezilla-project.org/",
    image: "/icons/FileZilla",
    alternativesTo: ["WinSCP"],
  },
  {
    name: "Terminus",
    description: "A terminal for a more modern age.",
    tags: ["Development", "Terminal"],
    link: "https://github.com/Eugeny/terminus",
    image: "/icons/Terminus",
    alternativesTo: ["Windows Terminal"],
  },
  {
    name: "CoolerControl",
    description: "Control your cooling devices on Linux.",
    tags: ["Utilities", "System"],
    link: "https://gitlab.com/coolercontrol/coolercontrol",
    image: "/icons/CoolerControl",
    alternativesTo: ["SpeedFan"],
  },
  {
    name: "OpenRGB",
    description: "Open source RGB lighting control that doesn't depend on manufacturer software.",
    tags: ["Utilities", "System"],
    link: "https://openrgb.org/",
    image: "/icons/OpenRGB",
    alternativesTo: ["iCUE", "Razer Synapse"],
  },


];

async function seed() {
  // Dynamic imports to ensure env vars are loaded first
  const { default: connectDB } = await import('../lib/db');
  const { default: Program } = await import('../models/Program');

  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected.');

    console.log('Clearing existing data...');
    await Program.deleteMany({});

    console.log('Syncing indexes...');
    await Program.syncIndexes();

    console.log('Seeding data...');
    await Program.insertMany(PROGRAMS);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
