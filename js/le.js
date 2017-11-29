function LEI() {
  this.ver = "0.2", this.consoleDomain = {
      "base.liveperson.net": "https://z1-a.le.liveperson.net/a/",
      "server.iad.liveperson.net": "https://z1.le.liveperson.net/a/",
      "server.lon.liveperson.net": "https://z2.le.liveperson.net/a/",
      "server.sy.liveperson.net": "https://z3.le.liveperson.net/a/"
    }, this.typeConvert = {
      text: "Text field",
      "select-one": "Drop-down menu",
      radio: "Radio button",
      checkbox: "Check box",
      textarea: "Text area"
    }, this.campPreUrl = "/#camp!campaigns/web/", this.engPreUrl =
    "/engagement/", this.debugCookieName = "LP_MTAG_DEBUG_MODE", this.chksiteId =
    "", this.showTimeinLog = !1, this.showLogFilter = !1, this.activeFilter = [],
    this.msgShown = !1, this.timerPeriod = "undefined" == typeof lpMTagConfig ||
    "undefined" == typeof lpMTagConfig.emtDebugTimerPeriod ? 1 : lpMTagConfig.emtDebugTimerPeriod,
    this.zindex = 2e5, this.logMaxLines = "undefined" == typeof lpMTagConfig ||
    "undefined" == typeof lpMTagConfig.mtagDebugMaxLine ? 500 : lpMTagConfig.mtagDebugMaxLine,
    "undefined" != typeof lpMTagConfig && "undefined" != typeof lpMTagConfig.emtDebugPosX ?
    this.posX = lpMTagConfig.emtDebugPosX : this.posX = 10, this.posY =
    "undefined" == typeof lpMTagConfig || "undefined" == typeof lpMTagConfig.emtDebugPosY ?
    10 : lpMTagConfig.emtDebugPosY, this.logWindowDimensionLimited = !1, this.maxLogWindowMaxHeight =
    300, this.maxLogWindowMaxWidth = 500, this.timestart = new Date, this.debugCookieName =
    "LP_MTAG_DEBUG_MODE", this.debugCookieValue = "cK1FoDtP", this.browser =
    "IE", this.noValueStr = "-", this.log = [], this.logErr = [], this.logWarn = [],
    this.eventLog = {
      dynButton: {},
      invite: {}
    }, this.msgSources = {
      "Not specified": {
        source: "Not specified"
      }
    }, this.ude = {}, this.logShown = !1, this.toolsShown = !1, this.counters = {
      logLine: 0,
      logErr: 0,
      logWarn: 0,
      logOK: 0,
      connPOST: 0,
      connGET: 0
    }, this._LOG_PLAY = "play", this._LOG_STOP = "stop", this._LOG_PAUSE =
    "pause", this._LOG_TRASH = "erase", this.logStatus = this._LOG_PLAY, this.logLineCnt =
    0, this.garbColStrCnt = 0, this.progressSymbols = ["-", "\\", "|", "/"],
    this.progressIdx = 0, this.evalToolCnt = 0, this.leChatProps = {
      numberOfButtons: 0,
      numberOfStickyButtons: 0,
      numberOfInvitations: 0,
      numberOfButtonsInPage: 0,
      numberOfStickyButtonsInPage: 0,
      numberOfInvitationsInPage: 0,
      ver: "",
      inPagePluginsArr: null,
      totalPluginsArr: null,
      engagementType: {
        button: "button",
        sticky_button: "sticky_button",
        invitation: "invitation"
      },
      getNumberOfElements: function(t, e) {
        var i = 0;
        if (!lpMTagDebug.leChatRef) return 0;
        var n = e ? lpMTagDebug.leChatRef.inPagePluginsArr : lpMTagDebug.leChatRef
          .jsonsArr;
        if ("undefined" != typeof n)
          for (var o in n) n[o].type === t && i++;
        return i
      }
    }, this.openCamp = function(t) {
      if ("undefined" != typeof lpTag) {
        var e = this.consoleDomain[lpTag.getDomain()] + lpTag.site + this.campPreUrl +
          t;
        window.open(e)
      }
    }, this.openEng = function(t, e) {
      if ("undefined" != typeof lpTag) {
        var i = this.consoleDomain[lpTag.getDomain()] + lpTag.site + this.campPreUrl +
          t + this.engPreUrl + e + "/studio";
        window.open(i)
      }
    }, this.generateHTML = function() {
      return this.logCtrlPanelHTML =
        "<div id='LEILogPlay'><div id='LEILogPlayImg'></div></div>                                  <div id='LEILogStop'><div id='LEILogStopImg'></div></div>                                  <div id='LEILogErase'><div id='LEILogEraseImg'></div></div>                              ",
        this.emtHtml =
        "<table id='LEIMainTable' cellspacing='0' cellpadding='0' border='0'>                            <tbody>                                <tr>                                    <td>                                        <table id='LEIMainTitleTable' width='100%' height='26px' cellspacing='0' cellpadding='0' border='0'>                                            <tbody>                                                <tr>                                                    <td id='emtDebugLogo'></td>                                                    <td id='LEIMainTitle'>Inspect Tool ver: " +
        this.ver +
        "</td>                                                    <td id='LEIMinimize'>                                                        <div class='LEIMiniWrapper'>                                                            <a href='javascript:;' alt='Close' title='Close'>                                                            <div id='LEIImgClose' class='LEICloseBtn'></div></a>                                                        </div>                                                        <div class='LEIMiniWrapper'>                                                            <a href='javascript:;' alt='Minimize / Maximize' title='Minimize / Maximize'>                                                            <div id='LEIImgMinimize' class='LEIMiniBtn'></div></a>                                                        </div>                                                    </td>                                                </tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                                <tr id='LEIMonitorWindow'>                                    <td>                                        <table id='emtDebugMainMonitorTable' width='100%' cellspacing='0' cellpadding='0' border='0'>                                            <tbody>                                                <tr class='LEImainTableTopRow'>                                                    <td></td>                                                    <td colspan='2' class='LEILable'>Account : </td>                                                    <td colspan='2' class='LEImainTableTopRowAcc LEIEMTDivider' id='LEIEMTsiteId'>" +
        this.noValueStr +
        "</td>                                                    <td colspan='4' id='LEIDomain' class='LEIEMTDivider'>" +
        this.noValueStr +
        "</td>                                                    <td class = 'LEILable'>Section : </td>                                                    <td colspan='4' id='LEIEMTSection' class='LEIEMTDivider'>" +
        this.noValueStr +
        "</td>                                                    <td>                                                        <a id='LEIToggleLog' href='javascript:;'>                                                            <div id='LEIImgLog'></div>                                                        </a>                                                    </td>                                                </tr>                                                <tr class='LEImainTableNumberRow'><td style='height:5px'></td></tr>                                                <tr class='LEImainTableNumberRow'>                                                    <td></td>                                                    <td id='LEIENGcnt' colspan='2'>" +
        this.noValueStr +
        "</td>                                                    <td id='LEIEMBcnt' colspan='2'>" +
        this.noValueStr +
        "</td>                                                    <td id='LEIClosedcnt' colspan='2'>" +
        this.noValueStr +
        "</td>                                                    <td id='LEIENGAtt' colspan='2'>" +
        this.noValueStr +
        "</td>                                                    <td id='LEIStatusTimeOnPage' colspan='2'>" +
        this.noValueStr +
        "</td>                                                    <td id='LEIERRcnt'>" +
        this.noValueStr +
        "</td>                                                    <td id='LEIWARNcnt'>" +
        this.noValueStr +
        "</td>                                                    <td class='emtDebugOK' id='LEIOKcnt'>" +
        this.noValueStr +
        "</td>                                                </tr>                                                <tr class='LEImainTableLabelRow'>                                                    <td></td>                                                    <td colspan='2'>Disp ENG.</td>                                                    <td colspan='2'>Emb ENG.</td>                                                    <td colspan='2'>Closed ENG.</td>                                                    <td colspan='2'>ENG. Att</td>                                                    <td colspan='2'>Time on page</td>                                                    <td>ERR</td>                                                    <td>WARN</td>                                                    <td>OK</td>                                                </tr>                                                <tr class='LEImainTableNumberRow'><td style='height:5px'></td></tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                                <tr id='LEIMainLogWindow'>                                    <td>                                        <table id='LEIMainLogWindowTable' width='600px' cellspacing='0' cellpadding='0' border='0'>                                            <tbody>                                                <tr id='LEIMessageWindowHeader'>                                                    <td id='LEIMessageWindowTitle'></td>                                                    <td id='LEIMessageWindowCtrlPanel'>                                                        </td>                                                    <td id='LEIMessageWindowClose' align='right'>                                                        <div style='float:right'><a href='javascript:;'>                                                            <div id='LEIImgCloseLog' border='0'></div>                                                        </a></div>                                                    </td>                                                </tr>                                                <tr id='LEIFilterRow' style='display:none;'>                                                    <td  colspan='3'>                                                        <div id='LEIFilterWindow'>FILTER GOES HERE</div>                                                    </td>                                                </tr                                                <tr>                                                    <td  colspan='3'>                                                        <div id='LEILogWindow'></div>                                                    </td>                                                </tr                                            </tbody>                                        </table>                                    </td>                                </tr>                                <tr id='LEIUtilWindow'>                                    <td>                                        <table id='LEIUtilTable' width='100%' cellspacing='0' cellpadding='0' border='0'>                                            <tbody>                                                <tr class='LEIUtilTopRow'>                                                    <td></td>                                                    <td></td>                                                    <td></td>                                                    <td></td>                                                    <td></td>                                                </tr>                                                <tr class='LEIUtilButtonsRow'>                                                    <td><input type='checkbox' id='incInv'><span style='color:#fff'>Include invisible questions</span></td>                                                    <td><input type='button' value='Scrape Survey' id='surveyScraper' onclick='lpMTagDebug.scrapeSurvey()'></td>                                                    <td><input type='button' value='Scrape Login Policy' id='getConf' onclick='lpMTagDebug.scrapeLoginPolicy()'></td>                                                </tr>                                                <tr class='LEIUtilBottomRow'>                                                    <td></td>                                                    <td></td>                                                    <td></td>                                                    <td></td>                                                    <td></td>                                                </tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                                <tr>                                    <td>                                        <table id='LEIMainStatusTable' height='20px' width='100%' cellspacing='0' cellpadding='0' border='0'>                                            <tbody>                                                <tr  class='LEIStatusBar'>                                                    <td><div id='LEITagStatIcon' class='LEITagStatNotFound'></div></td>                                                    <td id='LEITagStatText'>Tag not found.</div></td>                                                    <td >Ver :</td>                                                    <td id='LEILPTAGver'>" +
        this.noValueStr +
        "</td>                                                    <td >/</td>                                                    <td id='LEITAGver'>" +
        this.noValueStr +
        "</td>                                                    <td >Tag Load Time:</td>                                                    <td id='LEILoadTime'>" +
        this.noValueStr +
        "</td>                                                    <td></td>                                                    <td></td>                                                    <td></td>                                                    <td></td>                                                    <td></td>                                                    <td class='LEIStatusDivider'></td>                                                    <td id='LEIStatusImageTD'><div id='LEIStatusImage'>OK</div></td>                                                    <td class='LEIStatusDivider'></td>                                                    <td id='LEIMsgStatusLogPlayerStatus'>Log Active</td>                                                    <td class='LEIStatusDivider'></td>                                                    <td class='LEIStatusDivider'></td>                                                    <td id='LEIStatusResize' class='LEIStatusResize'></td>                                                </tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                            </tbody>                        </table>",
        this.emtHtml
    }, this.getMaxZindex = function() {
      for (var t = document.getElementsByTagName ? document.getElementsByTagName(
          "*") : document.all, e = 0, i = 0; i < t.length; i++) {
        var n = t[i],
          o = null;
        n.currentStyle ? o = n.currentStyle : document.defaultView && document.defaultView
          .getComputedStyle && (o = document.defaultView.getComputedStyle(n, ""));
        var s;
        s = o ? Number(o.zIndex) : Number(n.style.zIndex), isNaN(s) || (e =
          Math.max(e, s))
      }
      return e
    }, this.addCss = function() {
      var t = document.createElement("link");
      t.rel = "stylesheet", t.href =
        "https://stoneyshou.github.io/css/mystyles.css", document.getElementsByTagName(
          "head")[0].appendChild(t);
      var e = document.createElement("script");
      e.src =
        "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js",
        document.getElementsByTagName("head")[0].appendChild(e)
    }, this.getConfigInfo = function(t, e) {
      alert("Start!");
      var i = {
        async: !0,
        crossDomain: !0,
        url: "https://sy.ac.liveperson.net/api/account/85946726/configuration/le-targeting/onsite-locations/253856251?v=3.0",
        method: "GET",
        headers: {
          authorization: "Bearer f6ec69f2b8cf243158d74d41e44814c03e6de0dd508cf5a722dd4965c049117d",
          "cache-control": "no-cache",
          "postman-token": "3bdb6385-45a7-ece2-f2ab-2365df20ff19"
        }
      };
      console.log("sent!"), $.ajax(i)
        .done(function(t) {
          console.log(t)
        })
    }, this.createGenericDiv = function(t, e, i, n, o, s, l, r, d, a, h) {
      if (document.getElementsByTagName) {
        var g = document.getElementsByTagName("body");
        if (g && null == this.GetObj(t)) {
          var c = document.createElement("div");
          c.setAttribute("id", t), c.setAttribute("name", t), c.style.zIndex =
            e, c.style.position = "absolute", c.style.visibility = a ?
            "visible" : "hidden", c.style.left = i + "px", c.style.top = n +
            "px", null != o && (c.style.height = o + "px"), null != s && (c.style
              .width = s + "px"), c.innerHTML = l, c.style.cssText = c.style.cssText +
            h + "height:" + o + ";", null != r && (c.style.cursor = r), null !=
            d && (c.onclick = d), null != document.body.firstChild ? document.body
            .insertBefore(c, document.body.firstChild) : g.appendChild(c)
        }
      }
    }, this.GetObj = function(t) {
      return document.getElementById ? document.getElementById(t) : document.all ?
        document.all(t) : void 0
    }, this.BrowserSniff = function() {
      if (document.layers) return "NS";
      var t = navigator.userAgent.toLowerCase();
      if (document.all) {
        var e = t.indexOf("opera") != -1,
          i = t.indexOf("konqueror") != -1;
        return e ? "OPR" : i ? "KONQ" : "IE"
      }
      if (document.getElementById) {
        var n = t.indexOf("firefox") != -1;
        return n ? "FF" : "MOZ"
      }
      return "OTHER"
    }, this.attachEvents = function() {
      var t = this.GetObj("LEIMainTitle"),
        e = this;
      t.onmousedown = function(t) {
        e.DragStart("LEImainDiv", t)
      }, t = this.GetObj("LEIImgMinimize"), t.onclick = function() {
        e.minimizeAll()
      }, t = this.GetObj("LEIImgClose"), t.onclick = function() {
        e.closeWindow()
      }, t = this.GetObj("LEIToggleLog"), t.onclick = function() {
        e.scrapeSurvey()
      }, t = this.GetObj("LEIImgCloseLog"), t.onclick = function() {
        e.minimizeMsgDiv()
      }, this.msgShown ? (t = this.GetObj("LEIStatusResize"), t.className =
        "LEIStatusResize", t.onmousedown = function(t) {
          e.resizeStart("LEILogWindow", t)
        }) : (t = this.GetObj("LEIStatusResize"), t.className =
        "LEIStatusNOResize")
    }, this.engagementLeChatInfo = function(t, e) {
      var i = e ? this.leChatRef.inPagePluginsArr : this.leChatRef.jsonsArr,
        n = "";
      this.toolsShown && this.toggleTools(), this.logShown && this.toggleLog(),
        this.leChatRef || "undefined" == typeof i || (n =
          "NO engagements defined"), n = "<table>";
      for (var o in i) i[o].type === t && (n += "<tr><td>" + this.objectToString(
          i[o], void 0, !0, "LEIGeneralInfoNoBorder", !0) + "</tr>", n +=
        "<tr><td>----------------------------------------------------------</td></tr>"
      );
      return n += "</table>", this.showMsgWindow(!1, "Engagement Info", n, {
        width: 400,
        height: 100
      }), !1
    }, this.highlight = function(t) {
      t.className = "LEIClickable"
    }, this.rmHighlight = function(t) {
      t.className = ""
    }, this.seletElContent = function(t) {
      var e, i, n = document.body;
      if (document.createRange && window.getSelection) {
        e = document.createRange(), i = window.getSelection(), i.removeAllRanges();
        try {
          e.selectNodeContents(t), i.addRange(e)
        } catch (n) {
          e.selectNode(t), i.addRange(e)
        }
      } else n.createTextRange && (e = n.createTextRange(), e.moveToElementText(
        t), e.select())
    }, this.scrapeSurvey = function() {
      this.toolsShown && this.toggleTools(), this.logShown && this.toggleLog();
      var t = "";
      t =
        '<input type="button" value="Select All" id="selectAll" onclick ="lpMTagDebug.seletElContent(document.getElementById(\'LEISurveyTbl\'))">                <table>                    <thead>                    <tr>                        <td class="LEILable" width="30%">Question</td>                        <td class="LEILable" width="20%">Required?</td>                        <td class="LEILable" width="20%">Answer Type</td>                        <td class="LEILable">Answers</td>                    </tr>                    </thead>                    <tbody id="LEISurveyTbl">';
      for (var e = document.getElementById("questionsTable")
          .children[0], i = e.children, n = 1; n < i.length; n++) {
        var o = i[n].children[5],
          s = o.children[0].children[0];
        if (this.GetObj("incInv")
          .checked || s.src.indexOf("grn") >= 0) {
          var l = i[n].children[3],
            r = l.children[0].innerText,
            d = i[n].children[6],
            a = d.children[0].children[0],
            h = "No";
          a.src.indexOf("grn") >= 0 && (h = "Yes");
          var g = i[n].children[4],
            c = g.children[0].type,
            u = '"';
          if ("select-one" === c) {
            for (var m = g.firstChild.nextSibling, p = 0; p < m.length; p++) p >
              0 && (u += "\n"), u += m[p].innerText;
            console.log(u)
          } else if ("radio" === c || "checkbox" === c)
            for (var L = g.childNodes, f = 2; f < L.length; f += 3) f > 2 && (u +=
              "\n"), u += L[f].data;
          u += '"', t += '<tr>                                <td width="30%">' +
            r + "</td>", t += '   <td width="20%">' + h + "</td>", t +=
            '   <td width="20%">' + this.typeConvert[c] + "</td>", t +=
            '   <td style="white-space:pre">' + u +
            "</td>                             </tr>"
        }
      }
      return t += "</tbody></table>", this.showMsgWindow(!1,
        "Scraped Survey Info", t, {
          width: 500,
          height: 100
        }), !1
    }, this.scrapeLoginPolicy = function() {
      this.toolsShown && this.toggleTools(), this.logShown && this.toggleLog();
      var t = "";
      t =
        '<input type="button" value="Select All" id="selectAll" onclick ="lpMTagDebug.seletElContent(document.getElementById(\'LEILoginPolicyTbl\'))">                <table>                    <thead>                    <tr>                        <td class="LEILable" width="50%">Name</td>                        <td class="LEILable" width="20%">Value</td>                    </tr>                    </thead>                    <tbody id="LEILoginPolicyTbl">';
      var e = document.getElementsByClassName("bkgdeditTable"),
        i = e[0].children[0].children[0].children[0].children,
        n = i[0],
        o = "Password Policy",
        s = "Disabled",
        l = n.children[0].children[2].children[2].children[0];
      l.src.indexOf("grn") >= 0 && (s = "Enabled"), t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        '   <td width="20%" >' + s + "</td>                 </tr>";
      var r = n.children[0].children[3].children[0].children[0].children[0].children,
        d = r[1];
      o = " - Minimum number of characters";
      var a = d.children[1].children[0],
        h = d.children[1].children[0].selectedIndex;
      s = a[h].text, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var g = r[2];
      o = " - Maximum sequential characters (e.g. abcde)", a = g.children[1].children[
          0], h = g.children[1].children[0].selectedIndex, s = a[h].text, t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        "   <td >" + s + "</td>                 </tr>";
      var c = r[3];
      o = " - Maximum occurrences of same character", a = c.children[1].children[
          0], h = c.children[1].children[0].selectedIndex, s = a[h].text, t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        "   <td >" + s + "</td>                 </tr>";
      var u = r[4];
      o = " - Alpha character required";
      var m = u.children[0].children[0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var p = r[5];
      o = " - Number character required";
      var m = p.children[0].children[0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var L = r[6];
      o = " - Special character required";
      var m = L.children[0].children[0].children[0].children[0].children[0].children[
        0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var f = r[7];
      o = " - Number character required";
      var m = f.children[0].children[0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var b = r[8];
      o = " - Restrict commonly used password phrases";
      var m = b.children[0].children[0].children[0].children[0].children[0].children[
        0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var v = r[10];
      o = " - Apply policy to current passwords";
      var m = v.children[0].children[0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var E = r[13];
      o = " - Expires after number of days", a = E.children[1].children[0], h =
        E.children[1].children[0].selectedIndex, s = a[h].text, t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        "   <td >" + s + "</td>                 </tr>";
      var T = r[14];
      o = " - Notify users prior to expiration (days)", a = T.children[1].children[
          0], h = T.children[1].children[0].selectedIndex, s = a[h].text, t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        "   <td >" + s + "</td>                 </tr>";
      var w = r[16];
      o = " - Notify via email";
      var m = w.children[0].children[0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var I = r[17];
      o = " - Send to user's email address";
      var m = I.children[0].children[0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var I = r[18];
      o = " - Send to this email address";
      var m = I.children[0].children[0],
        y = I.children[1].children[0];
      s = m.checked + " " + y.value, t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        "   <td >" + s + "</td>                 </tr>";
      var M = r[19];
      o = " - Notify via login alert";
      var m = M.children[0].children[0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var S = r[20];
      o = " - Prevent using previous number passwords", a = S.children[1].children[
          0], h = S.children[1].children[0].selectedIndex, s = a[h].text, t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        "   <td >" + s + "</td>                 </tr>";
      var O = r[21];
      o = " - Maximum changes per day", a = O.children[1].children[0], h = O.children[
          1].children[0].selectedIndex, s = a[h].text, t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        "   <td >" + s + "</td>                 </tr>";
      var D = r[22];
      o = " - Allow operators to save password for next login";
      var m = D.children[0].children[0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var C = r[23];
      o = " - Allow operators to save username for next login";
      var m = C.children[0].children[0];
      s = m.checked, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += "   <td >" + s + "</td>                 </tr>";
      var x = i[2];
      o = "IP Policy", s = "Disabled", l = x.children[0].children[1].children[2]
        .children[0], l.src.indexOf("grn") >= 0 && (s = "Enabled"), t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        '   <td width="20%" >' + s + "</td>                 </tr>";
      var G = i[4];
      o = "Failed Login Policy", s = "Disabled", l = G.children[1].children[1].children[
          2].children[0], l.src.indexOf("grn") >= 0 && (s = "Enabled"), t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        '   <td width="20%" >' + s + "</td>                 </tr>";
      var j = G.children[1].children[2];
      o = " - Automatically disable operator after number of failed logins:", a =
        j.children[0].children[0].children[0].children[0].children[1].children[
          0], s = a[a.selectedIndex].text, t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        "   <td >" + s + "</td>                 </tr>";
      var P = G.children[1].children[2].children[0].children[0].children[0].children[
        1];
      o = " - Number of minutes before re-enabling disabled operator:", m = P.children[
          0].children[0].children[0].children[0].children[1].children[0], s = m
        .value, t += '<tr>                    <td width="50%">' + o + "</td>",
        t += "   <td >" + s + "</td>                 </tr>", m = i[6].children[
          0].children[2].children[1].children[0], o =
        "Reset password notification email address:", s = m.value, t +=
        '<tr>                    <td width="50%">' + o + "</td>", t +=
        "   <td >" + s + "</td>                 </tr>";
      var W = i[8];
      o = "Auto-Disable Operator Policy", s = "Disabled", l = W.children[1].children[
          1].children[2].children[0], l.src.indexOf("grn") >= 0 && (s =
          "Enabled"), t += '<tr>                    <td width="50%">' + o +
        "</td>", t += '   <td width="20%" >' + s +
        "</td>                 </tr>", m = W.children[1].children[2].children[0]
        .children[0].children[0].children[0].children[1].children[0], o =
        " - Automatically disable operators after number of inactive days:", s =
        m.value, t += '<tr>                    <td width="50%">' + o + "</td>",
        t += "   <td >" + s + "</td>                 </tr>";
      var N = i[10];
      o = "Idle Operator Policy", s = "Disabled", l = N.children[1].children[1]
        .children[2].children[0], l.src.indexOf("grn") >= 0 && (s = "Enabled"),
        t += '<tr>                    <td width="50%">' + o + "</td>", t +=
        '   <td width="20%" >' + s + "</td>                 </tr>", m = N.children[
          1].children[2].children[0].children[0].children[0].children[0], o =
        " - Automatic action when operator is logged in but idle:";
      for (var k = m.children[1].childNodes, R = 0; R < k.length - 1; R += 4) k[
        R + 1].checked && (s = k[R + 2].textContent);
      t += '<tr>                    <td width="50%">' + o + "</td>", t +=
        '   <td width="20%" >' + s + "</td>                 </tr>", m = N.children[
          1].children[2].children[0].children[0].children[0].children[1], o =
        " - Logout operator from the account after minutes of inactivity:", s =
        m.children[0].children[0].children[0].children[1].children[1].children[
          0].value, t += '<tr>                    <td width="50%">' + o +
        "</td>", t += '   <td width="20%" >' + s +
        "</td>                 </tr>";
      var A = i[13];
      return o = "LivePerson Local Administrator Policy", s = "Disabled", l = A
        .children[1].children[1].children[2].children[0], l.src.indexOf("grn") >=
        0 && (s = "Enabled"), t += '<tr>                    <td width="50%">' +
        o + "</td>", t += '   <td width="20%" >' + s +
        "</td>                 </tr>", t += "</tbody></table>", this.showMsgWindow(!
          1, "Scraped Login Policy", t, {
            width: 500,
            height: 100
          }), !1
    }, this.dispEngInfo = function() {
      this.toolsShown && this.toggleTools(), this.logShown && this.toggleLog();
      var t = "";
      if (t =
        '<table>                    <tr>                        <td class="LEILable" width="10%">No.</td>                        <td class="LEILable" width="20%">Campaign ID</td>                        <td class="LEILable">Engagement ID</td>                    </tr>',
        this.store.impDisplay.length > 0)
        for (var e = this.store.impDisplay, i = 0; i < e.length; i++) "object" ==
          typeof e[i] && (t += "<tr>                                <td>" + (i +
              1) + "</td>", t += '   <td id="campImp' + i +
            '" onclick="lpMTagDebug.openCamp(' + e[i].campaign +
            ')"                                                     onmouseover="lpMTagDebug.highlight(campImp' +
            i +
            ')"                                                     onmouseout="lpMTagDebug.rmHighlight(campImp' +
            i + ')">' + e[i].campaign + "</td>", t += '   <td id="engImp' + i +
            '" onclick="lpMTagDebug.openEng(' + e[i].campaign + "," + e[i].engId +
            ')"                                                      onmouseover="lpMTagDebug.highlight(engImp' +
            i +
            ')"                                                      onmouseout="lpMTagDebug.rmHighlight(engImp' +
            i + ')">' + e[i].engId + "</td>                             </tr>");
      return t += "</table>", this.showMsgWindow(!1,
        "Displayed Engagement Info", t, {
          width: 500,
          height: 100
        }), !1
    }, this.closedEngInfo = function() {
      this.toolsShown && this.toggleTools(), this.logShown && this.toggleLog();
      var t = "";
      if (t =
        '<table>                    <tr>                        <td class="LEILable" width="10%">No.</td>                        <td class="LEILable" width="20%">Campaign ID</td>                        <td class="LEILable">Engagement ID</td>                    </tr>',
        this.store.impClose.length > 0)
        for (var e = this.store.impClose, i = 0; i < e.length; i++) "object" ==
          typeof e[i] && (t += "<tr>                                <td>" + (i +
              1) + "</td>", t += '   <td id="campcls' + i +
            '" onclick="lpMTagDebug.openCamp(' + e[i].campaign +
            ')"                                                     onmouseover="lpMTagDebug.highlight(campcls' +
            i +
            ')"                                                     onmouseout="lpMTagDebug.rmHighlight(campcls' +
            i + ')">' + e[i].campaign + "</td>", t += '   <td id="engcls' + i +
            '" onclick="lpMTagDebug.openEng(' + e[i].campaign + "," + e[i].engId +
            ')"                                                      onmouseover="lpMTagDebug.highlight(engcls' +
            i +
            ')"                                                      onmouseout="lpMTagDebug.rmHighlight(engcls' +
            i + ')">' + e[i].engId + "</td>                             </tr>");
      return t += "</table>", this.showMsgWindow(!1,
        "Displayed Engagement Info", t, {
          width: 500,
          height: 100
        }), !1
    }, this.dispEngAtt = function() {
      this.toolsShown && this.toggleTools(), this.logShown && this.toggleLog();
      var t = "";
      if (t =
        '<table>                    <tr>                        <td class="LEILable" width="10%">No.</td>                        <td class="LEILable" width="30%">Engagement Attributes</td>                        <td class="LEILable">Data</td>                    </tr>',
        this.store) {
        var e = 0;
        for (name in this.store) "impDisplay" != name && "impClose" != name &&
          "pagediv" != name && "tabActive" != name && (t +=
            "<tr>                                <td>" + ++e + "</td>", t +=
            "   <td>" + name + "</td>", t += '   <td width="400px">' + JSON.stringify(
              this.store[name]) + "</td>                             </tr>")
      }
      return t += "</table>", this.showMsgWindow(!1, "Engagement Attributes", t, {
        width: 500,
        height: 100
      }), !1
    }, this.dispEMBInfo = function() {
      this.toolsShown && this.toggleTools(), this.logShown && this.toggleLog();
      var t = "";
      if (t =
        '<table>                    <tr>                        <td class="LEILable" width="10%">No.</td>                        <td class="LEILable" width="20%">Div ID</td>                        <td class="LEILable"></td>                    </tr>',
        this.store.pagediv.length > 0)
        for (var e = this.store.pagediv, i = 0; i < e.length; i++) "object" ==
          typeof e[i] && (t += "<tr>                                <td>" + (i +
              1) + "</td>", t += "   <td>" + e[i].divId + "</td>", t +=
            "   <td></td></tr>");
      return t += "</table>", this.showMsgWindow(!1, "Embedded Engagement Info",
        t, {
          width: 500,
          height: 100
        }), !1
    }, this.clearCompactSnippetMode = function() {
      return this.toggleTools(), this.GetCookie(this.debugCookieName) == this.debugCookieValue ?
        this.DeleteCookie(this.debugCookieName, "/") : this.SetCookie(this.debugCookieName,
          this.debugCookieValue, null, "/"), !1
    }, this.toggleViewMode = function(t) {
      var e = lpMTagDebug.GetObj("LEIObjectInfo-" + t);
      return null != e && ("none" == e.style.display || "" == e.style.display ?
        e.style.display = "block" : e.style.display = "none"), !1
    }, this.objectToString = function(t, e, i, n, o) {
      "undefined" == typeof e && (e = ","), "undefined" == typeof i && (i = !1),
        "undefined" == typeof o && (o = !1);
      var s, l = "";
      s = i ? "<table class='" + n + "'>" : "{";
      var r = !0;
      for (var d in t) {
        r ? r = !1 : i || (l += e);
        var a = "";
        if (null != t[d] && "undefined" != typeof t[d].constructor && (a =
            "undefined" != typeof t[d].constructor.name ? t[d].constructor.name :
            0 == t[d].constructor.toString()
            .indexOf("function") ? "function" : t[d].constructor.toString()), o &&
          "object" == typeof t[d] && null != t[d] && "undefined" != typeof t[d]
          .constructor && t[d].constructor != Image && t[d].constructor != Date &&
          a.indexOf("HTML") == -1)
          if (i) {
            var h = this.evalToolCnt++,
              g = this.objectToString(t[d], e, i, n, o);
            l += "" != g ?
              "<tr><th><a href=javascript:; onclick='lpMTagDebug.toggleViewMode(" +
              h + ")'>" + d + "</a></th><td id='LEIObjectInfo-" + h +
              "' class='LEIHiddenTD'>" + g + "</td>" : "<tr><th>" + d +
              "</th><td id='LEIObjectInfo-" + h + "'>" + g + "</td>"
          } else l += "'" + d + "':'" + this.objectToString(t[d], e, i, n, o) +
            "'";
        else {
          var c = null == t[d] ? "" : t[d].toString();
          c = c.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;"), l += i ? "<tr><th>" + d + "</th><td>" + c +
            "</td>" : "'" + d + "':'" + c + "'"
        }
      }
      return "" != l && (l = s + l, l += i ? "</table>" : "}"), l
    }, this.logPlayer = function(t) {
      var e, i = this;
      switch (t) {
        case this._LOG_TRASH:
          this.log = [], this.clearLogDisplay();
          break;
        case this._LOG_PLAY:
          e = this.GetObj("LEILogPlay"), e.onclick = function() {
              i.logPlayer(i._LOG_PAUSE)
            }, e = this.GetObj("LEILogPlayImg"), e.src = this.baseURL +
            "images/pause.png", e = this.GetObj("LEIMsgStatusLogPlayerStatus"),
            e.innerHTML = "Log Active", this.logStatus = t, this.clearLogDisplay(),
            this.displayFullLog(this.log);
          break;
        case this._LOG_PAUSE:
          e = this.GetObj("LEILogPlay"), e.onclick = function() {
              i.logPlayer(i._LOG_PLAY)
            }, e = this.GetObj("LEILogPlayImg"), e.src = this.baseURL +
            "images/play.png", e = this.GetObj("LEIMsgStatusLogPlayerStatus"),
            e.innerHTML = "Log Paused", this.logStatus = t;
          break;
        case this._LOG_STOP:
          e = this.GetObj("LEILogPlay"), e.onclick = function() {
              i.logPlayer(i._LOG_PLAY)
            }, e = this.GetObj("LEILogPlayImg"), e.src = this.baseURL +
            "images/play.png", e = this.GetObj("LEIMsgStatusLogPlayerStatus"),
            e.innerHTML = "Log Stopped", this.logStatus = t
      }
      return !1
    }, this.toggleLog = function() {
      this.toolsShown && this.toggleTools();
      var t = this;
      if (this.logShown) this.logShown = !1, this.hideMsgWindow();
      else {
        this.logShown = !0;
        var e =
          "<div id='LEILogToggleTime' class='LEITimeIcon'></div><div id='LEILogToggleFilter' class='LEIFilterIcon'></div><div class='LEILogTitle'>EMT Log</div>";
        this.showMsgWindow(!0, e);
        var i = this.GetObj("LEILogToggleTime");
        i.onclick = function() {
          return t.toggleLogTime(), !1
        };
        var i = this.GetObj("LEILogToggleFilter");
        i.onclick = function() {
          return t.toggleLogFilter(), !1
        }, this.displayFullLog(this.log)
      }
      return this.resizeShowHideImage(), !1
    }, this.toggleLogFilter = function() {
      if (this.showLogFilter = !this.showLogFilter, this.showLogFilter) {
        var t = "<table><tr>",
          e = [];
        e[0] = "", e[1] = "";
        var i = 0;
        for (var n in this.msgSources)
          if ("object" == typeof this.msgSources[n] && this.msgSources[n].source) {
            for (var o = "", s = 0; s < this.activeFilter.length; s++)
              if (n == this.activeFilter[s]) {
                o = "checked";
                break
              }
            e[i] += '<input name="LEIFilterChoice" value="' + n +
              '" type="checkbox" ' + o + ">" + n + "</input><br>", i = 0 == i ?
              1 : 0
          }
        t += "<td>" + e[0] + "</td>", t += "<td>" + e[1] + "</td>", t +=
          "<td align='center'><a id='LEILogToggleFilterApply' href=javascript:;><img src='" +
          this.baseURL + "images/apply.png' border='0'/></td></a>", t +=
          "<td align='center'><a id='LEILogToggleFilterCancel' href=javascript:;><img src='" +
          this.baseURL + "images/cancel.png' border='0'/></td></a>", t +=
          "</tr></table>";
        var l = this.GetObj("LEIFilterWindow");
        if (null != l) {
          l.innerHTML = t;
          var r = this,
            d = this.GetObj("LEILogToggleFilterApply");
          d.onclick = function() {
              return r.logFilterApply(), !1
            }, d = this.GetObj("LEILogToggleFilterCancel"), d.onclick =
            function() {
              return r.logFilterCancel(), !1
            }
        }
        this.showObj("LEIFilterRow")
      } else this.hideObj("LEIFilterRow")
    }, this.logFilterCancel = function() {
      this.showLogFilter = !this.showLogFilter, this.activeFilter = [], this.hideObj(
        "LEIFilterRow"), this.displayFullLog(this.log)
    }, this.logFilterApply = function() {
      this.showLogFilter = !this.showLogFilter, this.activeFilter = [], this.hideObj(
        "LEIFilterRow");
      for (var t = document.getElementsByName("LEIFilterChoice"), e = 0; e < t.length; e++)
        t[e].checked && (this.activeFilter[this.activeFilter.length] = t[e].value);
      this.displayFullLog(this.log)
    }, this.toggleLogTime = function() {
      return this.showTimeinLog = !this.showTimeinLog, this.displayFullLog(this
        .log), !1
    }, this.hideMsgWindow = function() {
      this.msgShown = !1, this.logShown && (this.logShown = !1), this.hideObj(
          "LEIMainLogWindow", !0), this.GetObj("LEILogWindow")
        .innerHTML = "", this.resizeShowHideImage()
    }, this.showMsgWindow = function(t, e, i, n) {
      this.msgShown = !0, this.resizeShowHideImage(), this.showTR(
        "LEIMainLogWindow"), this.showObj("LEIMainLogWindow", !1);
      var o;
      if ("undefined" != typeof t && t) {
        this.GetObj("LEIMessageWindowCtrlPanel")
          .innerHTML = this.logCtrlPanelHTML;
        var s = this;
        o = this.GetObj("LEILogPlay"), o.onclick = function() {
          s.logPlayer(s._LOG_PAUSE)
        }, o = this.GetObj("LEILogStop"), o.onclick = function() {
          s.logPlayer(s._LOG_STOP)
        }, o = this.GetObj("LEILogErase"), o.onclick = function() {
          s.logPlayer(s._LOG_TRASH)
        }
      } else this.GetObj("LEIMessageWindowCtrlPanel")
        .innerHTML = "";
      e && (this.GetObj("LEIMessageWindowTitle")
        .innerHTML = e), i && (this.GetObj("LEILogWindow")
        .innerHTML = i), "undefined" == typeof n || this.resized || (o = this
        .GetObj("LEILogWindow"), n.width && (o.style.width = "100%"), n.height &&
        (o.style.height = n.height + "px"), o.style.overflow = "auto")
    }, this.toggleTools = function() {
      if (this.toolsShown) this.toolsShown = !1, this.hideObj("LEIToolsDiv");
      else {
        this.toolsShown = !0;
        var t;
        "undefined" != typeof lpMTag && (t = this.GetObj("LEIStopStartEMT"),
            lpMTag.stopMTag ? t.innerHTML = "Start EMT" : t.innerHTML =
            "Stop EMT"), "undefined" == typeof lpMTagConfig || "undefined" ==
          typeof lpMTagConfig.lpServer || "undefined" == typeof lpMTagConfig.lpNumber ?
          this.hideObj("LEIAdminArea") : this.showObj("LEIAdminArea");
        var e = this.getElWidthHeight("LEIToggleTools", "LEImainDiv");
        t = this.GetObj("LEIToolsDiv"), t.style.left = e.ul.x + "px", t.style.top =
          e.br.y + 3 + "px", this.showObj("LEIToolsDiv")
      }
      return !1
    }, this.updateConfig = function() {
      var t = this,
        e = !1;
      if ("undefined" != typeof lpMTag && (elem = this.GetObj("LEITagStatIcon"),
          "LEITagStatWarn" != elem.className && (e = !0, elem.className =
            "LEITagStatWarn", elem = this.GetObj("LEITagStatText"), elem.innerHTML =
            "Old monitor tag")), "undefined" != typeof lpTag) {
        elem = this.GetObj("LEITagStatIcon"), "LEITagStatOk" != elem.className &&
          void 0 != lpTag.site && (elem.className = "LEITagStatOk", e = !0,
            elem = this.GetObj("LEITagStatText"), elem.innerHTML =
            "Tag detected.");
        var i = new Date,
          n = new Date;
        this.timestart = lpTag._timing.contReady > 0 ? new Date(lpTag._timing.contReady) :
          this.timestart;
        var o = i.getTime() - this.timestart.getTime();
        n.setTime(o);
        var s = n.getUTCMinutes() > 0 ? n.getUTCMinutes() + "m " : "",
          l = n.getUTCHours() > 0 ? n.getUTCHours() + "h " : "",
          r = n.getUTCSeconds() + "s",
          d = l + s + r;
        elem = this.GetObj("LEIStatusTimeOnPage"), elem.innerHTML = d;
        var a = lpTag.site || "Not Found";
        this.store = "function" == typeof lpTag.sdes.inspect ? lpTag.sdes.inspect()
          .store : {}, elem = this.GetObj("LEIEMTsiteId"), elem.innerHTML != a &&
          (e = !0, elem.innerHTML = a);
        var h = 0;
        for (name in this.store) "impDisplay" != name && "impClose" != name &&
          "pagediv" != name && "tabActive" != name && h++;
        h > 0 && (elem = this.GetObj("LEIENGAtt"), elem.innerHTML = h, elem.style
          .cursor = "pointer", elem.onclick = function() {
            t.dispEngAtt()
          });
        var g = "function" == typeof lpTag.getDomain ? lpTag.getDomain() : this
          .noValueStr;
        elem = this.GetObj("LEIDomain"), elem.innerHTML != g && "undefined" !=
          g && (e = !0, elem.innerHTML = g), "" != lpTag.section && (elem =
            this.GetObj("LEIEMTSection"), e = !0, elem.innerHTML = lpTag.section
          );
        var c = this.store.impDisplay;
        if ("undefined" != typeof c) {
          var u = c.length;
          elem = this.GetObj("LEIENGcnt"), elem.innerHTML != u && (e = !0, elem
            .innerHTML = u, elem.onclick = function() {
              t.dispEngInfo()
            }, elem.className = "emtDebugInfo")
        }
        var m = this.store.pagediv;
        if ("undefined" != typeof m) {
          var p = m.length;
          elem = this.GetObj("LEIEMBcnt"), elem.innerHTML != p && (e = !0, elem
            .innerHTML = p, elem.onclick = function() {
              t.dispEMBInfo()
            }, elem.className = "emtDebugInfo")
        }
        var L = this.store.impClose;
        if ("undefined" != typeof L) {
          var u = L.length;
          elem = this.GetObj("LEIClosedcnt"), elem.innerHTML != u && (e = !0,
            elem.innerHTML = u, elem.onclick = function() {
              t.closedEngInfo()
            }, elem.className = "emtDebugInfo")
        }
        elem = this.GetObj("LEILoadTime");
        var f = lpTag._timing.start || 0,
          b = lpTag._timing.contReady || 0,
          v = b - f > 0 ? b - f : "N/A";
        elem.innerHTML === this.noValueStr && (e = !0, elem.innerHTML = v +
            "ms"), this.leChatRef = "undefined" != typeof lpTagConfig &&
          "undefined" != typeof lpTagConfig.tagPlugins ? lpTagConfig.tagPlugins :
          null, this.leChatProps.ver = "undefined" != typeof lpTagConfig ? " (" +
          lpTagConfig._ver + ")" : "";
        var E = "undefined" != typeof lpTag ? lpTag._v : this.noValueStr;
        elem = this.GetObj("LEILPTAGver"), elem.innerHTML != E && (e = !0, elem
          .innerHTML = E);
        var T = "undefined" != typeof lpTag ? lpTag._tagv : this.noValueStr;
        elem = this.GetObj("LEITAGver"), elem.innerHTML != T && (e = !0, elem.innerHTML =
            T), this.counters.logOK > 0 && (elem = this.GetObj("LEIOKcnt"),
            elem.innerHTML != this.counters.logOK && (e = !0, elem.innerHTML =
              this.counters.logOK), elem.className = "emtDebugOK"), this.counters
          .logWarn > 0 && (elem = this.GetObj("LEIWARNcnt"), elem.innerHTML !=
            this.counters.logWarn && (e = !0, elem.innerHTML = this.counters.logWarn),
            elem.className = "emtDebugWarn", elem.onclick = function() {
              t.logShowErrWarn("warn")
            }, 0 == this.counters.logErr && (elem = this.GetObj(
                "LEIStatusImage"), elem.innerHTML = "Warning", elem.style.cursor =
              "pointer", elem.onclick = function() {
                t.maximizeAll(), t.logShowErrWarn("warn")
              })), this.counters.logErr > 0 && (elem = this.GetObj("LEIERRcnt"),
            elem.innerHTML != this.counters.logErr && (e = !0, elem.innerHTML =
              this.counters.logErr), elem.className = "emtDebugError", elem.onclick =
            function() {
              t.logShowErrWarn("error")
            }, elem = this.GetObj("LEIStatusImage"), elem.innerHTML = "Error",
            elem.style.cursor = "pointer", elem.onclick = function() {
              t.maximizeAll(), t.logShowErrWarn("error")
            })
      }
      this.timerRef = setTimeout(function() {
        t.updateConfig()
      }, 1e3 * this.timerPeriod)
    }, this.minimizeAll = function() {
      var t = this;
      this.toolsShown && this.toggleTools(), this.logShown && this.toggleLog(),
        this.hideObj("LEIMonitorWindow"), this.hideObj("LEIMainLogWindow");
      var e = this.GetObj("LEIImgMinimize");
      return e.className = "LEIMaxBtn", e.onclick = function() {
        t.maximizeAll()
      }, !1
    }, this.closeWindow = function() {
      var t = document.body,
        e = document.getElementById("LEImainDiv");
      t.removeChild(e)
    }, this.showTR = function(t) {
      "IE" == this.browser ? this.GetObj(t)
        .style.display = "block" : this.GetObj(t)
        .style.display = "table-row", this.showObj(t, !1)
    }, this.maximizeAll = function() {
      var t = this;
      this.showTR("LEIMonitorWindow");
      var e = this.GetObj("LEIImgMinimize");
      return e.className = "LEIMiniBtn", e.onclick = function() {
        t.minimizeAll()
      }, !1
    }, this.minimizeMsgDiv = function() {
      return this.hideMsgWindow(), !1
    }, this.resizeShowHideImage = function() {
      var t = this.GetObj("LEIStatusResize");
      if (this.msgShown) {
        var e = this;
        t.className = "LEIStatusResize", t.onmousedown = function(t) {
          e.resizeStart("LEILogWindow", t)
        }
      } else t.className = "LEIStatusNOResize", t.onmousedown = null
    }, this.resizeObj = null, this.resized = !1, this.resizeStart = function(t,
      e) {
      if (!this.msgShown) return !1;
      if (this.resizeObj = this.GetObj(t), null == this.resizeObj) return void alert(
        "NO resize Object:" + t);
      this.resized = !0;
      var i, n;
      return "IE" == this.browser ? (i = window.event.clientX + document.documentElement
          .scrollLeft + document.body.scrollLeft, n = window.event.clientY +
          document.documentElement.scrollTop + document.body.scrollTop) : (i =
          e.clientX + window.scrollX, n = e.clientY + window.scrollY), this.resizeCursorStartX =
        i, this.resizeCursorStartY = n, this.resizeElStartDimen = this.getElWidthHeight(
          t), "IE" == this.browser ? (document.attachEvent("onmousemove",
            lpMTagDebug.resizeGo), document.attachEvent("onmouseup",
            lpMTagDebug.resizeStop), window.event.cancelBubble = !0, window.event
          .returnValue = !1) : (document.addEventListener("mousemove",
          lpMTagDebug.resizeGo, !0), document.addEventListener("mouseup",
          lpMTagDebug.resizeStop, !0), e.preventDefault()), !1
    }, this.resizeGo = function(t) {
      var e, i;
      "IE" == lpMTagDebug.browser ? (e = window.event.clientX + document.documentElement
        .scrollLeft + document.body.scrollLeft, i = window.event.clientY +
        document.documentElement.scrollTop + document.body.scrollTop) : (e =
        t.clientX + window.scrollX, i = t.clientY + window.scrollY);
      var n = lpMTagDebug.resizeElStartDimen.width + (e - lpMTagDebug.resizeCursorStartX),
        o = lpMTagDebug.resizeElStartDimen.height + (i - lpMTagDebug.resizeCursorStartY);
      n >= 0 && (lpMTagDebug.resizeObj.style.width = n + "px"), o >= 0 && (
        lpMTagDebug.resizeObj.style.height = o + "px");
      var s = lpMTagDebug.getElWidthHeight("LEIMainLogWindow");
      return n < s.width && n >= 0 && (lpMTagDebug.resizeObj.style.width = s.width +
        "px"), !1
    }, this.resizeStop = function() {
      return "IE" == lpMTagDebug.browser ? (document.detachEvent("onmousemove",
        lpMTagDebug.resizeGo), document.detachEvent("onmouseup",
        lpMTagDebug.resizeStop)) : (document.removeEventListener("mousemove",
        lpMTagDebug.resizeGo, !0), document.removeEventListener("mouseup",
        lpMTagDebug.resizeStop, !0)), !1
    }, this.getElWidthHeight = function(t, e) {
      var i = this.GetObj(t);
      if (null == i) return alert("Error getting the element:" + t), !1;
      var n = {};
      n.x = i.offsetLeft, n.y = i.offsetTop;
      for (var o = i.offsetParent; o && o.id != e && "BODY" != o.tagName.toUpperCase();)
        n.x += o.offsetLeft, n.y += o.offsetTop, o = o.offsetParent;
      var s = {};
      return s.x = n.x + i.offsetWidth, s.y = n.y + i.offsetHeight, {
        width: s.x - n.x,
        height: s.y - n.y,
        ul: n,
        br: s
      }
    }, this.dragObj = null, this.DragStart = function(t, e) {
      if (this.toolsShown && (this.hideObj("LEIToolsDiv"), this.toolsShown = !1),
        this.dragObj = this.GetObj(t), null == this.dragObj) return void alert(
        "NO drag Object");
      var i, n;
      return "IE" == this.browser ? (i = window.event.clientX + document.documentElement
          .scrollLeft + document.body.scrollLeft, n = window.event.clientY +
          document.documentElement.scrollTop + document.body.scrollTop) : (i =
          e.clientX + window.scrollX, n = e.clientY + window.scrollY), this.dragCursorStartX =
        i, this.dragCursorStartY = n, this.dragElStartLeft = parseInt(this.dragObj
          .style.left, 10), this.dragElStartTop = parseInt(this.dragObj.style.top,
          10), isNaN(this.dragElStartLeft) && (this.dragElStartLeft = 0), isNaN(
          this.dragElStartTop) && (this.dragElStartTop = 0), "IE" == this.browser ?
        (document.attachEvent("onmousemove", lpMTagDebug.dragGo), document.attachEvent(
            "onmouseup", lpMTagDebug.dragStop), window.event.cancelBubble = !0,
          window.event.returnValue = !1) : (document.addEventListener(
          "mousemove", lpMTagDebug.dragGo, !0), document.addEventListener(
          "mouseup", lpMTagDebug.dragStop, !0), e.preventDefault()), !1
    }, this.dragGo = function(t) {
      var e, i;
      "IE" == lpMTagDebug.browser ? (e = window.event.clientX + document.documentElement
        .scrollLeft + document.body.scrollLeft, i = window.event.clientY +
        document.documentElement.scrollTop + document.body.scrollTop) : (e =
        t.clientX + window.scrollX, i = t.clientY + window.scrollY);
      var n = lpMTagDebug.dragElStartLeft + e - lpMTagDebug.dragCursorStartX;
      n < 1 && (n = 1);
      var o = lpMTagDebug.dragElStartTop + i - lpMTagDebug.dragCursorStartY;
      return o < 1 && (o = 1), lpMTagDebug.dragObj.style.left = n + "px",
        lpMTagDebug.dragObj.style.top = o + "px", "IE" == lpMTagDebug.browser ?
        (window.event.cancelBubble = !0, window.event.returnValue = !1) : t.preventDefault(), !
        1
    }, this.dragStop = function() {
      return "IE" == lpMTagDebug.browser ? (document.detachEvent("onmousemove",
          lpMTagDebug.dragGo), document.detachEvent("onmouseup", lpMTagDebug.dragStop)) :
        (document.removeEventListener("mousemove", lpMTagDebug.dragGo, !0),
          document.removeEventListener("mouseup", lpMTagDebug.dragStop, !0)), !
        1
    }, this.hideObj = function(t, e) {
      "undefined" == typeof e && (e = !0);
      var i = this.GetObj(t);
      null != i && (i.style.visibility = "hidden", e && (i.style.display =
        "none"))
    }, this.showObj = function(t, e) {
      "undefined" == typeof e && (e = !0);
      var i = this.GetObj(t);
      null != i && (i.style.visibility = "visible", e && (i.style.display =
        "block"))
    }, this.Display = function(t, e, i) {
      if (t.indexOf("Garbage Collection") > -1) {
        if (this.garbColStrCnt++, 10 == this.garbColStrCnt) t =
          "PAUSING LOG DISPLAY", e = "WARN";
        else if (this.garbColStrCnt > 10) return
      } else this.garbColStrCnt = 0;
      t.indexOf("GET") > -1 && this.counters.connGET++, t.indexOf("POST") > -1 &&
        this.counters.connPOST++;
      var n, o, s;
      if (t.indexOf("EVENT") > -1)
        if (t.indexOf("DynBut") > -1) {
          var l = null;
          if (n = null, o = t.indexOf("lpMTagConfig.dynButton"), o != -1 && (n =
              o + "lpMTagConfig.dynButton".length, l = parseInt(t.substr(n), 10)
            ), null == l) {
            o = t.indexOf("DynBut") + "DynBut ".length;
            for (var r = t.substring(o, t.indexOf("EVENT") - 1), d = 0; d <
              lpMTagConfig.dynButton.length; d++)
              if (lpMTagConfig.dynButton[d].name == r) {
                l = d;
                break
              }
          }
          s = t.substr(t.indexOf("EVENT") + " EVENT:".length), "undefined" ==
            typeof this.eventLog.dynButton["but" + l] && (this.eventLog.dynButton[
              "but" + l] = []), this.eventLog.dynButton["but" + l][this.eventLog
              .dynButton["but" + l].length
            ] = s
        } else if (t.indexOf("lpMTagConfig.invite") > -1) {
        o = t.indexOf("lpMTagConfig.invite"), n = o + "lpMTagConfig.invite".length;
        var a = parseInt(t.substr(n), 10);
        isNaN(a) && (n = o + "lpMTagConfig.inviteMC".length, a = parseInt(t.substr(
            n), 10)), s = t.substr(n + a.toString()
            .length + " EVENT: ".length), "undefined" == typeof this.eventLog.invite[
            "inv" + a] && (this.eventLog.invite["inv" + a] = []), this.eventLog
          .invite["inv" + a][this.eventLog.invite["inv" + a].length] = s
      }
      "ERROR" == e ? this.counters.logErr++ : "EXEC-OK" == e ? this.counters.logOK++
        : "WARN" == e ? this.counters.logWarn++ : this.counters.logOK++, this.counters
        .logLine++, this.log.length == this.logMaxLines && this.log.shift();
      var h = new Date,
        g = h.getHours(),
        c = h.getMinutes(),
        u = h.getSeconds();
      g < 10 && (g = "0" + g), c < 10 && (c = "0" + c), u < 10 && (u = "0" + u);
      var m = g + ":" + c + ":" + u;
      "undefined" == typeof i && (i = "Not specified");
      var p = {
        msg: t,
        time: m,
        level: e,
        source: i
      };
      "undefined" == typeof this.msgSources[i] && (this.msgSources[i] = {
          source: i
        }), "ERROR" == e ? this.logErr[this.logErr.length] = p : "WARN" == e &&
        (this.logWarn[this.logWarn.length] = p), this.logStatus != this._LOG_STOP &&
        (this.log[this.log.length] = p, this.logShown && this.logStatus != this
          ._LOG_PAUSE && this.printLogLine(p))
    }, this.displayFullLog = function(t) {
      this.clearLogDisplay();
      for (var e = 0; e < t.length; e++) this.printLogLine(t[e])
    }, this.clearLogDisplay = function() {
      var t = this.GetObj("LEILogWindow");
      t.innerHTML = ""
    }, this.logShowErrWarn = function(t) {
      this.logShown && this.toggleLog(), this.toolsShown && this.toggleTools();
      var e;
      if ("warn" == t) e = this.logWarn;
      else {
        if ("error" != t) return void alert("wrong logType=" + t);
        e = this.logErr
      }
      return this.showMsgWindow(!1,
        "Error Messages from Log !!!Not updated Live!!!", "", {
          width: 400,
          height: this.maxLogWindowMaxHeight
        }), this.displayFullLog(e), !1
    }, this.printLogLine = function(t) {
      var e = !0;
      if (this.activeFilter.length > 0) {
        e = !1;
        for (var i = 0; i < this.activeFilter.length; i++)
          if (t.source == this.activeFilter[i]) {
            e = !0;
            break
          }
        if (!e) return
      }
      var n = "";
      n = "ERROR" == t.level ? "LEILogMessageERROR" : "EXEC-OK" == t.level ?
        "LEILogMessageOK" : "WARN" == t.level ? "LEILogMessageWARN" :
        "LEILogMessageDEBUG";
      var o = this.GetObj("LEILogWindow"),
        s = document.createElement("div");
      s.id = "mtagTextDiv-" + this.counters.logLine, s.className = n, s.innerHTML =
        (this.showTimeinLog ? t.time + " " : " ") + t.msg, null != o.firstChild ?
        o.insertBefore(s, o.firstChild) : o.appendChild(s);
      var l, r = this.getElWidthHeight("LEILogWindow");
      !this.resized && r.height > this.maxLogWindowMaxHeight && (l = this.GetObj(
          "LEILogWindow"), l.style.height = this.maxLogWindowMaxHeight + "px",
        this.logWindowDimensionLimited || (l.style.width = r.width + 15 +
          "px"), l.style.overflow = "auto", this.logWindowDimensionLimited = !
        0), !this.resized && r.width > this.maxLogWindowMaxWidth && (l = this
        .GetObj("LEILogWindow"), l.style.width = this.maxLogWindowMaxWidth +
        "px", l.style.overflow = "auto", this.logWindowDimensionLimited = !0)
    }, this.getUdes = function() {
      "undefined" != typeof lpMTagConfig && (this.ude.page = lpMTagConfig.pageVar,
        this.ude.session = lpMTagConfig.sessionVar, this.ude.visitor =
        lpMTagConfig.visitorVar)
    }, this.showUdes = function() {
      this.logShown && this.toggleLog(), this.toolsShown && this.toggleTools();
      var t = "<b>Page UDEs</b><br />";
      return t += this.objectToString(this.ude.page, void 0, !0,
          "LEIGeneralInfo", !1), t += "<br /><b>Session UDEs</b>", t += this.objectToString(
          this.ude.session, void 0, !0, "LEIGeneralInfo", !1), t +=
        "<br /><b>Visitor UDEs</b>", t += this.objectToString(this.ude.visitor,
          void 0, !0, "LEIGeneralInfo", !1), this.showMsgWindow(!1,
          "UDEs at page start", t, {
            width: 400,
            height: this.maxLogWindowMaxHeight
          }), !1
    }, this.DisplayArray = function(t, e) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i].split("<!!>");
        this.Display(n[0], n[1], e)
      }
    }, this.GetPageWidth = function() {
      return document.documentElement && document.documentElement.clientWidth ?
        document.documentElement.clientWidth : document.body ? document.body.clientWidth :
        window.innerWidth
    }, this.SetCookie = function(t, e, i, n, o, s) {
      var l = new Date,
        r = l.getTime();
      "undefined" != typeof i && null != i || (i = 1e3 * i * 60 * 60 * 24, r =
        l.getTime() + i), document.cookie = t + "=" + escape(e) + (i ?
        ";expires=" + r.toGMTString() : "") + (n ? ";path=" + n : "") + (o ?
        ";domain=" + o : "") + (s ? ";secure" : "")
    }, this.DeleteCookie = function(t, e, i) {
      this.GetCookie(t) && (document.cookie = t + "=" + (e ? ";path=" + e : "") +
        (i ? ";domain=" + i : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT")
    }, this.GetCookie = function(t) {
      var e = document.cookie.indexOf(t + "="),
        i = e + t.length + 1;
      if (!e && t != document.cookie.substring(0, t.length)) return null;
      if (e == -1) return null;
      var n = document.cookie.indexOf(";", i);
      return n == -1 && (n = document.cookie.length), unescape(document.cookie.substring(
        i, n))
    }, this.start = function() {
      var t = this;
      this.getUdes(), this.browser = this.BrowserSniff(), this.addCss(), this.generateHTML(),
        this.createGenericDiv("LEImainDiv", this.zindex, this.posX, this.posY,
          null, null, this.emtHtml, null, null, 0), "undefined" != typeof lpMTagConfig &&
        "undefined" != typeof lpMTagConfig.emtDebugPosRight && lpMTagConfig.emtDebugPosRight &&
        (this.posX = this.GetPageWidth() - this.GetObj("LEImainDiv")
          .clientWidth - 30), this.GetObj("LEImainDiv")
        .style.left = this.posX + "px", this.showObj("LEImainDiv", !1), this.attachEvents(),
        "undefined" != typeof lpMTagConfig && "undefined" != typeof lpMTagConfig
        .emtDebugSuperMiniMode && lpMTagConfig.emtDebugSuperMiniMode && this.minimizeAll(),
        this.timerRef = setTimeout(function() {
          t.updateConfig()
        }, 500)
    }
}
var lpMTagDebug = new LEI;
lpMTagDebug.start();
