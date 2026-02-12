// Windows 11 Simulator - Vanilla JS Version

// --- Icons ---
const Icons = {
    home: `<svg viewBox="0 0 512 512" width="24" height="24"><path d="M448 463.746H298.667V314.413h-85.334v149.333H64V148.318L256 36.572l192 110.984v316.19z" fill="currentColor"/></svg>`,
    search: `<svg height="24" width="24" viewBox="0 0 512 512"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285T224 57.397t-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286T224 377.397z" fill="currentColor"/></svg>`,
    widget: `<svg viewBox="0 0 16 16" width="16" height="16"><path d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"/></svg>`,
    // ... more icons to be added
};

// --- Apps Data ---
const appsData = [
    { name: "Settings", icon: "settings", type: "app", action: "SETTINGS" },
    { name: "File Explorer", icon: "explorer", type: "app", action: "EXPLORER" },
    { name: "Browser", icon: "edge", type: "app", action: "MSEDGE" },
    { name: "Store", icon: "store", type: "app", action: "WNSTORE" },
    { name: "Recycle Bin", icon: "bin0", type: "app" },
    { name: "Calculator", icon: "calculator", type: "app", action: "CALCUAPP" },
    { name: "Notepad", icon: "notepad", type: "app", action: "NOTEPAD" },
    { name: "Spotify", icon: "spotify", type: "app", action: "SPOTIFY" },
    { name: "Terminal", icon: "terminal", type: "app", action: "TERMINAL" },
];

// --- Wallpapers ---
const wallpapers = [
    "https://win11.blueedge.me/img/wallpaper/default/img0.jpg",
    "https://cdn.builder.io/api/v1/image/assets%2F37e1f4ac500e4c6c9efe772f6c93f617%2F4298759886c1400197f2d8cc1a4d5ab9"
];

// --- State Management ---
let state = {
    wallpaper: {
        src: wallpapers[0],
        locked: true,
        booted: false,
        theme: "light"
    },
    apps: {
        settings: { open: false, max: false, z: 1 },
        explorer: { open: false, max: false, z: 1 },
        edge: { open: false, max: false, z: 1 },
        notepad: { open: false, max: false, z: 1 },
        terminal: { open: false, max: false, z: 1 },
    },
    menus: {
        start: false,
        side: false,
        widgets: false,
        calendar: false
    },
    user: {
        name: "User",
        password: "shadowtide11",
        pin: "9384254"
    }
};

// --- Core Functions ---
function dispatch(action) {
    console.log("Dispatching:", action);
    switch (action.type) {
        case "BOOT_COMPLETE":
            state.wallpaper.booted = true;
            break;
        case "UNLOCK":
            state.wallpaper.locked = false;
            break;
        case "TOGGLE_START":
            state.menus.start = !state.menus.start;
            break;
        case "OPEN_APP":
            if (state.apps[action.payload]) {
                state.apps[action.payload].open = true;
                state.apps[action.payload].z = Math.max(...Object.values(state.apps).map(a => a.z)) + 1;
            }
            state.menus.start = false;
            break;
        case "CLOSE_APP":
            if (state.apps[action.payload]) {
                state.apps[action.payload].open = false;
            }
            break;
        case "TOGGLE_THEME":
            state.wallpaper.theme = state.wallpaper.theme === "light" ? "dark" : "light";
            state.wallpaper.src = state.wallpaper.theme === "light" ? wallpapers[0] : wallpapers[1];
            document.body.dataset.theme = state.wallpaper.theme;
            break;
    }
    render();
}

function render() {
    const root = document.getElementById("root");
    const bootscreen = document.getElementById("bootscreen");
    const lockscreen = document.getElementById("lockscreen");
    const appwrap = document.getElementById("appwrap");
    const background = document.getElementById("background");
    const startmenu = document.getElementById("startmenu");

    // Boot screen
    if (state.wallpaper.booted) {
        bootscreen.classList.add("hidden");
    } else {
        bootscreen.classList.remove("hidden");
    }

    // Lock screen
    if (!state.wallpaper.locked && state.wallpaper.booted) {
        lockscreen.classList.add("hidden");
        appwrap.classList.remove("hidden");
    } else if (state.wallpaper.booted) {
        lockscreen.classList.remove("hidden");
        appwrap.classList.add("hidden");
    }

    // Wallpaper
    background.style.backgroundImage = `url(${state.wallpaper.src})`;

    // Start Menu
    startmenu.dataset.hide = !state.menus.start;

    // Taskbar icons
    renderTaskbar();
    
    // Desktop icons
    renderDesktop();

    // Windows
    renderWindows();
}

function renderTaskbar() {
    const tasks = document.querySelector(".tasks");
    tasks.innerHTML = "";
    
    // Static actions (Start, Search, Widgets)
    const actions = [
        { icon: "home", action: "TOGGLE_START" },
        { icon: "search", action: "TOGGLE_SEARCH" },
        { icon: "widget", action: "TOGGLE_WIDGETS" }
    ];

    actions.forEach(a => {
        const div = document.createElement("div");
        div.className = "taskicon uicon";
        div.innerHTML = Icons[a.icon] || `<img src="https://win11.blueedge.me/img/icon/ui/${a.icon}.png" width="24">`;
        div.onclick = () => dispatch({ type: a.action });
        tasks.appendChild(div);
    });

    // Pinned Apps
    appsData.slice(0, 5).forEach(app => {
        const div = document.createElement("div");
        div.className = "taskicon uicon";
        div.innerHTML = `<img src="https://win11.blueedge.me/img/icon/${app.icon}.png" width="24">`;
        div.onclick = () => dispatch({ type: "OPEN_APP", payload: app.name.toLowerCase().replace(" ", "") });
        tasks.appendChild(div);
    });
}

function renderDesktop() {
    // Similar to taskbar but for desktop
}

function renderWindows() {
    // Render window divs for open apps
}

// --- Initialization ---
window.onload = () => {
    setTimeout(() => {
        dispatch({ type: "BOOT_COMPLETE" });
    }, 2000);

    // Update time
    setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
        
        document.getElementById("lock-time").innerText = timeStr;
        document.querySelector(".time").innerText = timeStr;
        document.querySelector(".date").innerText = dateStr;
    }, 1000);

    // Lockscreen interaction
    document.getElementById("lockscreen").onclick = (e) => {
        if (e.target.id === "lockscreen") {
            document.getElementById("lockscreen").dataset.blur = "true";
            document.querySelector(".splashScreen").dataset.faded = "true";
            document.querySelector(".fadeinScreen").dataset.faded = "false";
        }
    };

    document.getElementById("pass-submit").onclick = () => {
        const input = document.getElementById("pass-input").value;
        if (input === state.user.password || input === state.user.pin) {
            dispatch({ type: "UNLOCK" });
        } else {
            document.getElementById("pass-input").value = "";
            alert("Wrong password!");
        }
    };
};
