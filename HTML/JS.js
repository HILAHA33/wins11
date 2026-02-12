// Windows 11 Simulator - Vanilla JS Version

// --- Icons (SVG Strings) ---
const Icons = {
    home: `<svg viewBox="0 0 512 512" width="24" height="24"><path d="M448 463.746H298.667V314.413h-85.334v149.333H64V148.318L256 36.572l192 110.984v316.19z" fill="currentColor"/></svg>`,
    search: `<svg height="24" width="24" viewBox="0 0 512 512"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285T224 57.397t-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286T224 377.397z" fill="currentColor"/></svg>`,
    widget: `<svg viewBox="0 0 16 16" width="16" height="16"><path d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"/></svg>`,
    minimize: `<svg viewBox="0 0 10 1" width="12" height="12"><rect width="10" height="1" fill="currentColor"/></svg>`,
    maximize: `<svg viewBox="0 0 10 10" width="12" height="12"><path d="M0 0h10v10H0V0zm1 1v8h8V1H1z" fill="currentColor"/></svg>`,
    maxmin: `<svg viewBox="0 0 10 10" width="12" height="12"><path d="M2 0h8v8H2V0zm1 1v6h6V1H3zM0 2h8v8H0V2zm1 1v6h6V3H1z" fill="currentColor"/></svg>`,
    close: `<svg viewBox="0 0 10 10" width="14" height="14"><path d="M0 0l10 10M10 0L0 10" stroke="currentColor" stroke-width="1.2"/></svg>`,
};

// --- Apps Data ---
const appsData = [
    { name: "Settings", icon: "settings", type: "app", action: "SETTINGS", src: "https://win11.blueedge.me/img/icon/settings.png" },
    { name: "File Explorer", icon: "explorer", type: "app", action: "EXPLORER", src: "https://win11.blueedge.me/img/icon/explorer.png" },
    { name: "Browser", icon: "edge", type: "app", action: "MSEDGE", src: "https://win11.blueedge.me/img/icon/edge.png" },
    { name: "Store", icon: "store", type: "app", action: "WNSTORE", src: "https://win11.blueedge.me/img/icon/store.png" },
    { name: "Calculator", icon: "calculator", type: "app", action: "CALCUAPP", src: "https://win11.blueedge.me/img/icon/calculator.png" },
    { name: "Notepad", icon: "notepad", type: "app", action: "NOTEPAD", src: "https://win11.blueedge.me/img/icon/notepad.png" },
    { name: "Spotify", icon: "spotify", type: "app", action: "SPOTIFY", src: "https://win11.blueedge.me/img/icon/spotify.png" },
    { name: "Terminal", icon: "terminal", type: "app", action: "TERMINAL", src: "https://win11.blueedge.me/img/icon/terminal.png" },
    { name: "Discord", icon: "discord", type: "app", action: "DISCORD", src: "https://win11.blueedge.me/img/icon/discord.png" },
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
        theme: "light",
        hz: 100
    },
    apps: {
        settings: { open: false, max: false, z: 1, hide: false, dim: { width: "800px", height: "600px", top: "10%", left: "10%" } },
        explorer: { open: false, max: false, z: 1, hide: false, dim: { width: "900px", height: "600px", top: "15%", left: "15%" } },
        edge: { open: false, max: false, z: 1, hide: false, dim: { width: "1000px", height: "700px", top: "5%", left: "5%" }, url: "https://www.bing.com" },
        notepad: { open: false, max: false, z: 1, hide: false, dim: { width: "600px", height: "400px", top: "20%", left: "20%" } },
        terminal: { open: false, max: false, z: 1, hide: false, dim: { width: "700px", height: "450px", top: "25%", left: "25%" } },
        calculator: { open: false, max: false, z: 1, hide: false, dim: { width: "320px", height: "500px", top: "30%", left: "30%" } },
        spotify: { open: false, max: false, z: 1, hide: false, dim: { width: "1000px", height: "700px", top: "5%", left: "10%" } },
    },
    menus: {
        start: false,
        side: false,
        widgets: false,
        calendar: false
    },
    user: {
        name: "J. Olander",
        password: "shadowtide11",
        pin: "9384254"
    }
};

// --- Dispatch Function ---
function dispatch(action) {
    console.log("Dispatch:", action);
    switch (action.type) {
        case "BOOT_COMPLETE":
            state.wallpaper.booted = true;
            break;
        case "UNLOCK":
            state.wallpaper.locked = false;
            break;
        case "STARTMENU":
            state.menus.start = !state.menus.start;
            state.menus.side = false;
            state.menus.widgets = false;
            break;
        case "PANE_TOGGLE":
            state.menus.side = !state.menus.side;
            state.menus.start = false;
            break;
        case "OPEN_APP":
            const appKey = action.payload.toLowerCase().replace(" ", "");
            if (state.apps[appKey]) {
                state.apps[appKey].open = true;
                state.apps[appKey].hide = false;
                state.wallpaper.hz++;
                state.apps[appKey].z = state.wallpaper.hz;
            }
            state.menus.start = false;
            break;
        case "CLOSE_APP":
            if (state.apps[action.payload]) {
                state.apps[action.payload].open = false;
            }
            break;
        case "MINIMIZE_APP":
            if (state.apps[action.payload]) {
                state.apps[action.payload].hide = true;
            }
            break;
        case "MAXIMIZE_APP":
            if (state.apps[action.payload]) {
                state.apps[action.payload].max = !state.apps[action.payload].max;
            }
            break;
        case "BRING_FRONT":
            if (state.apps[action.payload]) {
                state.wallpaper.hz++;
                state.apps[action.payload].z = state.wallpaper.hz;
                state.apps[action.payload].hide = false;
            }
            break;
        case "TOGGLE_THEME":
            state.wallpaper.theme = state.wallpaper.theme === "light" ? "dark" : "light";
            state.wallpaper.src = state.wallpaper.theme === "light" ? wallpapers[0] : wallpapers[1];
            document.body.dataset.theme = state.wallpaper.theme;
            break;
        case "WINDOW_RESIZE":
            if (state.apps[action.payload.app]) {
                state.apps[action.payload.app].dim = action.payload.dim;
            }
            break;
    }
    render();
}

// --- Rendering Logic ---
function render() {
    const root = document.getElementById("root");
    const bootscreen = document.getElementById("bootscreen");
    const lockscreen = document.getElementById("lockscreen");
    const appwrap = document.getElementById("appwrap");
    const background = document.getElementById("background");
    const startmenu = document.getElementById("startmenu");
    const sidepane = document.getElementById("sidepane");

    // Boot screen
    bootscreen.classList.toggle("hidden", state.wallpaper.booted);

    // Lock screen
    if (!state.wallpaper.locked && state.wallpaper.booted) {
        lockscreen.classList.add("hidden");
        appwrap.classList.remove("hidden");
    } else {
        lockscreen.classList.toggle("hidden", !state.wallpaper.booted);
        appwrap.classList.add("hidden");
    }

    // Wallpaper
    background.style.backgroundImage = `url(${state.wallpaper.src})`;

    // Menus
    startmenu.dataset.hide = !state.menus.start;
    if (state.menus.start) {
        startmenu.innerHTML = `
            <div class="p-8 h-full flex flex-col text-black dark:text-white">
                <div class="flex-grow">
                    <div class="flex justify-between items-center mb-4">
                        <span class="font-bold">Pinned</span>
                        <button class="text-xs bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10 px-2 py-1 rounded">All apps ></button>
                    </div>
                    <div class="grid grid-cols-6 gap-4">
                        ${appsData.map(app => `
                            <div class="flex flex-col items-center cursor-pointer hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 p-2 rounded" onclick="dispatch({type: 'OPEN_APP', payload: '${app.name}'})">
                                <img src="${app.src}" width="32">
                                <span class="text-xs mt-1 text-center">${app.name}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
                <div class="mt-8">
                    <div class="font-bold mb-4">Recommended</div>
                    <div class="grid grid-cols-2 gap-4 text-black dark:text-white">
                        <div class="flex items-center p-2 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded cursor-pointer">
                            <img src="https://win11.blueedge.me/img/icon/getstarted.png" width="32" class="mr-3">
                            <div>
                                <p class="text-xs font-bold">Get Started</p>
                                <p class="text-[10px] opacity-60">Welcome to Windows</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-auto pt-4 border-t border-black border-opacity-10 dark:border-white dark:border-opacity-10 flex justify-between items-center text-black dark:text-white">
                    <div class="flex items-center">
                        <img src="https://cdn.builder.io/api/v1/image/assets%2F37e1f4ac500e4c6c9efe772f6c93f617%2Fb5b17e157f12404c8020f594e1921f82" width="32" class="rounded-full mr-2">
                        <span class="text-sm">${state.user.name}</span>
                    </div>
                    <div class="uicon p-2 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded">
                        <i class="fas fa-power-off"></i>
                    </div>
                </div>
            </div>
        `;
    }
    sidepane.dataset.hide = !state.menus.side;
    if (state.menus.side) {
        sidepane.innerHTML = `
            <div class="p-6 h-full flex flex-col text-black dark:text-white">
                <div class="grid grid-cols-3 gap-4 mb-8">
                    <div class="flex flex-col items-center p-2 rounded bg-blue-500 text-white cursor-pointer">
                        <i class="fas fa-wifi mb-1"></i>
                        <span class="text-[10px]">WiFi</span>
                    </div>
                    <div class="flex flex-col items-center p-2 rounded bg-blue-500 text-white cursor-pointer">
                        <i class="fas fa-bluetooth mb-1"></i>
                        <span class="text-[10px]">Bluetooth</span>
                    </div>
                    <div class="flex flex-col items-center p-2 rounded bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10 cursor-pointer" onclick="dispatch({type: 'TOGGLE_THEME'})">
                        <i class="fas ${state.wallpaper.theme === 'light' ? 'fa-sun' : 'fa-moon'} mb-1"></i>
                        <span class="text-[10px]">Theme</span>
                    </div>
                </div>
                <div class="space-y-6">
                    <div class="flex items-center">
                        <i class="fas fa-sun mr-4 opacity-60"></i>
                        <input type="range" class="flex-grow accent-blue-500" value="100">
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-volume-up mr-4 opacity-60"></i>
                        <input type="range" class="flex-grow accent-blue-500" value="80">
                    </div>
                </div>
                <div class="mt-auto flex justify-between items-center text-sm border-t border-black border-opacity-10 dark:border-white dark:border-opacity-10 pt-4">
                    <div class="flex items-center">
                        <i class="fas fa-battery-full mr-2 text-green-500"></i>
                        <span>100%</span>
                    </div>
                    <div class="uicon p-2">
                        <i class="fas fa-cog"></i>
                    </div>
                </div>
            </div>
        `;
    }

    renderTaskbar();
    renderDesktop();
    renderWindows();
}

function renderTaskbar() {
    const tasks = document.querySelector(".tasks");
    tasks.innerHTML = "";
    
    // Core Icons
    const cores = [
        { icon: "home", action: "STARTMENU" },
        { icon: "search", action: "SEARCHMENU" },
        { icon: "widget", action: "WIDGETS" }
    ];

    cores.forEach(c => {
        const div = document.createElement("div");
        div.className = "taskicon uicon";
        div.innerHTML = Icons[c.icon] || `<img src="https://win11.blueedge.me/img/icon/ui/${c.icon}.png" width="24">`;
        div.onclick = () => dispatch({ type: c.action });
        tasks.appendChild(div);
    });

    // Pinned Apps
    appsData.forEach(app => {
        const appKey = app.name.toLowerCase().replace(" ", "");
        const isActive = state.apps[appKey] && state.apps[appKey].open;
        const div = document.createElement("div");
        div.className = "taskicon uicon";
        if (isActive) div.classList.add("active-task");
        div.innerHTML = `<img src="${app.src}" width="24">`;
        div.onclick = () => {
            if (isActive) dispatch({ type: "BRING_FRONT", payload: appKey });
            else dispatch({ type: "OPEN_APP", payload: app.name });
        };
        tasks.appendChild(div);
    });
}

function renderDesktop() {
    const container = document.getElementById("desktop-icons");
    container.innerHTML = "";
    appsData.forEach(app => {
        const div = document.createElement("div");
        div.className = "desk-icon uicon flex flex-col items-center p-2 m-2 w-20 text-white text-xs text-center hover:bg-white hover:bg-opacity-10 rounded";
        div.innerHTML = `<img src="${app.src}" width="32" class="mb-1"><span class="drop-shadow-md">${app.name}</span>`;
        div.onclick = () => dispatch({ type: "OPEN_APP", payload: app.name });
        container.appendChild(div);
    });
}

function renderWindows() {
    const container = document.getElementById("windows-container");
    
    Object.keys(state.apps).forEach(key => {
        const app = state.apps[key];
        let win = document.getElementById(key + "-window");

        if (app.open) {
            if (!win) {
                win = document.createElement("div");
                win.id = key + "-window";
                win.className = "window floatTab dpShad";
                win.innerHTML = `
                    <div class="toolbar" onmousedown="startDrag(event, '${key}')">
                        <div class="topInfo flex items-center">
                            <img src="${appsData.find(a => a.name.toLowerCase().replace(" ", "") === key).src}" width="14">
                            <div class="appFullName text-xss ml-2">${key.toUpperCase()}</div>
                        </div>
                        <div class="actbtns flex">
                            <div class="uicon" onclick="dispatch({type: 'MINIMIZE_APP', payload: '${key}'})">${Icons.minimize}</div>
                            <div class="uicon" onclick="dispatch({type: 'MAXIMIZE_APP', payload: '${key}'})">${Icons.maximize}</div>
                            <div class="uicon closeBtn" onclick="dispatch({type: 'CLOSE_APP', payload: '${key}'})">${Icons.close}</div>
                        </div>
                    </div>
                    <div class="windowScreen flex-grow relative overflow-hidden bg-white">
                        ${renderAppContent(key)}
                    </div>
                `;
                container.appendChild(win);
            }

            win.classList.toggle("hidden", app.hide);
            win.style.zIndex = app.z;
            
            if (app.max) {
                win.style.width = "100%";
                win.style.height = "calc(100% - 48px)";
                win.style.top = "0";
                win.style.left = "0";
                win.style.borderRadius = "0";
            } else {
                win.style.width = app.dim.width;
                win.style.height = app.dim.height;
                win.style.top = app.dim.top;
                win.style.left = app.dim.left;
                win.style.borderRadius = "8px";
            }
        } else if (win) {
            win.remove();
        }
    });
}

function renderAppContent(key) {
    switch (key) {
        case "settings":
            return `<div class="p-8 h-full overflow-auto text-black dark:text-white bg-white dark:bg-[#1e1e26]">
                <h1 class="text-3xl font-bold mb-4">Settings</h1>
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 border rounded hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 cursor-pointer" onclick="dispatch({type: 'TOGGLE_THEME'})">
                        <p class="font-bold">Personalization</p>
                        <p class="text-sm opacity-60">Change theme and background</p>
                    </div>
                </div>
            </div>`;
        case "explorer":
            return `<div class="flex flex-col h-full text-black bg-white">
                <div class="flex items-center p-2 border-b bg-gray-50 space-x-4">
                    <i class="fas fa-arrow-left opacity-40"></i>
                    <i class="fas fa-arrow-right opacity-40"></i>
                    <i class="fas fa-arrow-up opacity-40"></i>
                    <div class="flex-grow border px-2 py-0.5 bg-white text-xs">This PC > Desktop</div>
                    <div class="border px-2 py-0.5 bg-white text-xs w-32">Search Desktop</div>
                </div>
                <div class="flex flex-grow">
                    <div class="w-40 border-r bg-gray-50 p-2 text-xs space-y-2">
                        <div class="flex items-center"><i class="fas fa-star mr-2 text-blue-500"></i>Quick access</div>
                        <div class="flex items-center"><i class="fas fa-cloud mr-2 text-blue-400"></i>OneDrive</div>
                        <div class="flex items-center"><i class="fas fa-desktop mr-2"></i>This PC</div>
                        <div class="flex items-center"><i class="fas fa-network-wired mr-2"></i>Network</div>
                    </div>
                    <div class="flex-grow p-4 grid grid-cols-4 content-start gap-4">
                        ${appsData.map(app => `
                            <div class="flex flex-col items-center p-2 hover:bg-blue-50 cursor-pointer">
                                <img src="${app.src}" width="48">
                                <span class="text-[10px] mt-1 text-center">${app.name}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>`;
        case "edge":
            return `<iframe src="${state.apps.edge.url}" class="w-full h-full border-none"></iframe>`;
        case "terminal":
            return `<div class="bg-black text-white p-4 font-mono h-full">
                <div>Microsoft Windows [Version 10.0.22000.194]</div>
                <div>(c) Microsoft Corporation. All rights reserved.</div>
                <div class="mt-4">C:\\Users\\User> <span class="animate-pulse">_</span></div>
            </div>`;
        default:
            return `<div class="flex items-center justify-center h-full text-gray-400 italic">${key.toUpperCase()} Content Coming Soon</div>`;
    }
}

// --- Drag and Resize ---
let activeWin = null;
let offset = [0, 0];

function startDrag(e, key) {
    if (e.target.closest(".actbtns")) return;
    activeWin = key;
    dispatch({ type: "BRING_FRONT", payload: key });
    const win = document.getElementById(key + "-window");
    const rect = win.getBoundingClientRect();
    offset = [e.clientX - rect.left, e.clientY - rect.top];
    
    document.onmousemove = doDrag;
    document.onmouseup = stopDrag;
    win.classList.add("notrans");
}

function doDrag(e) {
    if (!activeWin) return;
    const win = document.getElementById(activeWin + "-window");
    const app = state.apps[activeWin];
    if (app.max) return;

    let newTop = e.clientY - offset[1];
    let newLeft = e.clientX - offset[0];
    
    win.style.top = newTop + "px";
    win.style.left = newLeft + "px";
}

function stopDrag() {
    if (activeWin) {
        const win = document.getElementById(activeWin + "-window");
        win.classList.remove("notrans");
        dispatch({
            type: "WINDOW_RESIZE",
            payload: {
                app: activeWin,
                dim: {
                    width: win.style.width,
                    height: win.style.height,
                    top: win.style.top,
                    left: win.style.left
                }
            }
        });
    }
    activeWin = null;
    document.onmousemove = null;
    document.onmouseup = null;
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
        
        const lockTime = document.getElementById("lock-time");
        if (lockTime) lockTime.innerText = timeStr;
        const lockDate = document.getElementById("lock-date");
        if (lockDate) lockDate.innerText = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
        
        const taskTime = document.querySelector(".time");
        if (taskTime) taskTime.innerText = timeStr;
        const taskDate = document.querySelector(".date");
        if (taskDate) taskDate.innerText = dateStr;
    }, 1000);

    // Lockscreen interaction
    document.getElementById("lockscreen").onclick = (e) => {
        if (e.target.id === "lockscreen" || e.target.closest(".splashScreen")) {
            document.getElementById("lockscreen").dataset.blur = "true";
            document.querySelector(".splashScreen").dataset.faded = "true";
            document.querySelector(".fadeinScreen").dataset.faded = "false";
        }
    };

    document.getElementById("forgot-pass").onclick = () => {
        document.getElementById("forgot-pass").innerText = "Not my problem";
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

    document.getElementById("pass-input").onkeydown = (e) => {
        if (e.key === "Enter") document.getElementById("pass-submit").click();
    };

    // Global background click to close menus
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".startMenu") && !e.target.closest(".taskicon") && !e.target.closest(".sidePane")) {
            if (state.menus.start || state.menus.side) {
                state.menus.start = false;
                state.menus.side = false;
                render();
            }
        }
    });

    render();
};
