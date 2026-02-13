import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, ToolBar, LazyComponent } from "../../../utils/general";

export const EdgeMenu = () => {
  const wnapp = useSelector((state) => state.apps.edge);
  const [tabs, setTabs] = useState([
    {
      url: "https://www.google.com/?igu=1",
      hist: ["https://bing.com", "https://bing.com"],
      isTyping: false,
    },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [ierror, setErr] = useState(true);
  const dispatch = useDispatch();

  const active = tabs[activeTab] || tabs[0];

  const iframes = {
    "https://www.google.com/webhp?igu=1": "Google",
    "https://bing.com": "Bing",
    "https://www.youtube.com/embed/m0EHSoZzHEA": "Youtube",
    "https://blueedge.me": "J. Olander",
    "https://andrewstech.me": "\nandrewstech",
    "https://blueedge.me/unescape": "Unescape",
    "https://win11.blueedge.me": "Inception",
    "https://open.spotify.com/embed/user/jhfivkgdtg4s97pwbo1rbvr9v/playlist/6IdR78TOog83PV4XhLDvWN":
      "Spotify",
    "https://bluelab.blueedge.me": "BlueLab",
    "https://othello.blueedge.me": "Othello",
  };

  const favicons = {
    "https://andrewstech.me":
      "https://avatars.githubusercontent.com/u/45342431",
  };

  const isValidURL = (string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
  };

  const action = (e) => {
    var x = e.target && e.target.dataset.payload;
    const newTabs = [...tabs];
    const current = newTabs[activeTab];

    if (x == 0) {
      const iframe = document.getElementById("isite-" + activeTab);
      if (iframe) iframe.src = iframe.src;
    } else if (x == 1) {
      current.hist = [current.url, "https://www.bing.com"];
      current.url = "https://www.bing.com";
      current.isTyping = false;
      setTabs(newTabs);
    } else if (x == 2) {
      current.hist = [current.url, "https://www.google.com/webhp?igu=1"];
      current.url = "https://www.google.com/webhp?igu=1";
      current.isTyping = false;
      setTabs(newTabs);
    } else if (x == 3) {
      if (e.key === "Enter") {
        var qry = e.target.value;

        if (isValidURL(qry)) {
          if (!qry.startsWith("http")) {
            qry = "https://jaxson-os.replit.app/uv/service/https://" + qry;
          }
        } else {
          qry = "https://www.bing.com/search?q=" + qry;
        }

        e.target.value = qry;
        current.hist = [current.hist[0], qry];
        current.url = qry;
        current.isTyping = false;
        setTabs(newTabs);
      }
    } else if (x == 4) {
      current.url = current.hist[0];
      current.isTyping = false;
      setTabs(newTabs);
    } else if (x == 5) {
      current.url = current.hist[1];
      current.isTyping = false;
      setTabs(newTabs);
    } else if (x == 6) {
      var tmp = e.target.dataset.url;
      current.hist = [current.url, tmp];
      current.url = tmp;
      current.isTyping = false;
      setTabs(newTabs);
    }
  };

  const typing = (e) => {
    const newTabs = [...tabs];
    const current = newTabs[activeTab];
    if (!current.isTyping) {
      current.isTyping = true;
      current.hist = [current.url, current.url];
    }
    current.url = e.target.value;
    setTabs(newTabs);
  };

  const addTab = () => {
    setTabs([
      ...tabs,
      {
        url: "https://www.google.com/?igu=1",
        hist: ["https://bing.com", "https://bing.com"],
        isTyping: false,
      },
    ]);
    setActiveTab(tabs.length);
  };

  const closeTab = (e, i) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      dispatch({ type: wnapp.action, payload: "close" });
      return;
    }
    const newTabs = tabs.filter((_, idx) => idx !== i);
    setTabs(newTabs);
    if (activeTab >= newTabs.length) {
      setActiveTab(newTabs.length - 1);
    }
  };

  const handleFailed = () => {
    setErr(false);
  };

  useEffect(() => {
    if (wnapp.url) {
      const newTabs = [...tabs];
      newTabs[activeTab].isTyping = false;
      newTabs[activeTab].url = wnapp.url;
      setTabs(newTabs);
      dispatch({ type: "EDGELINK" });
    }
  }, [wnapp.url]);

  return (
    <div
      className="edgeBrowser floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Browser"
        float
      />
      <div className="windowScreen flex flex-col">
        <div className="overTool flex items-center">
          <Icon src={wnapp.icon} width={14} margin="0 6px" />
          <div className="flex overflow-x-auto no-scrollbar">
            {tabs.map((tab, i) => (
              <div
                key={i}
                className={`btab ${i === activeTab ? "active-tab" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                <div className="text-xs truncate w-24 ml-2">
                  {iframes[tab.url] ||
                    (tab.url.includes("google.com") ? "Google" : "New Tab")}
                </div>
                <Icon
                  fafa="faTimes"
                  onClick={(e) => closeTab(e, i)}
                  width={10}
                  margin="0 6px"
                />
              </div>
            ))}
          </div>
          <Icon fafa="faPlus" onClick={addTab} width={12} margin="0 10px" />
        </div>
        <div className="restWindow flex-grow flex flex-col">
          <div className="addressBar w-full h-10 flex items-center">
            <Icon
              className="edgenavicon"
              src="left"
              onClick={action}
              payload={4}
              width={14}
              ui
              margin="0 8px"
            />
            <Icon
              className="edgenavicon"
              src="right"
              onClick={action}
              payload={5}
              width={14}
              ui
              margin="0 8px"
            />
            <Icon
              fafa="faRedo"
              onClick={action}
              payload={0}
              width={14}
              margin="0 8px"
            />
            <Icon
              fafa="faHome"
              onClick={action}
              payload={1}
              width={18}
              margin="0 16px"
            />
            <div className="addCont relative flex items-center">
              <input
                className="w-full h-6 px-4"
                onKeyDown={action}
                onChange={typing}
                data-payload={3}
                value={active.url}
                placeholder="Type url or a query to search"
                type="text"
              />
              <Icon
                className="z-1 handcr"
                src="google"
                ui
                onClick={action}
                payload={2}
                width={14}
                margin="0 10px"
              />
            </div>
          </div>
          <div className="w-full bookbar py-2">
            <div className="flex">
              {Object.keys(iframes).map((mark, i) => {
                return (
                  <div
                    key={i}
                    className="flex handcr items-center ml-2 mr-1 prtclk"
                    onClick={action}
                    data-payload={6}
                    data-url={mark}
                  >
                    <Icon
                      className="mr-1"
                      ext
                      width={16}
                      src={
                        iframes[mark][0] != "\n"
                          ? new URL(mark).origin + "/favicon.ico"
                          : favicons[mark]
                      }
                    />
                    <div className="text-xs">{iframes[mark].trim()}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="siteFrame flex-grow overflow-hidden relative">
            <LazyComponent show={!wnapp.hide}>
              {tabs.map((tab, i) => (
                <iframe
                  key={i}
                  src={!tab.isTyping ? tab.url : tab.hist[0]}
                  id={"isite-" + i}
                  frameborder="0"
                  className={`w-full h-full absolute top-0 left-0 ${
                    i === activeTab ? "z-10" : "z-0 pointer-events-none opacity-0"
                  }`}
                  title="site"
                ></iframe>
              ))}
            </LazyComponent>

            <div
              className={`bg-blue-100 w-64 rounded dpShad p-2 absolute bottom-0 right-0 my-4 mx-12 transition-all ${
                ierror ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div
                className="absolute bg-red-400 m-1 text-red-900 text-xs px-1 font-bold handcr top-0 right-0 rounded hover:bg-red-500"
                onClick={handleFailed}
              >
                x
              </div>
              <div className="text-gray-800 text-xs font-medium">
                If it shows <b>"Refused to connect"</b>, then{" "}
                <b>that website doesn't allow </b>
                other websites to show their content. <b>I cannot fix it</b>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
