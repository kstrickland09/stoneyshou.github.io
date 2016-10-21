function LEI() {
    this.ver = '0.2';

    // Console URLs per domain
    this.consoleDomain = {
        "base.liveperson.net":"https://z1-a.le.liveperson.net/a/",// Alpha
        "server.iad.liveperson.net":"https://z1.le.liveperson.net/a/", // US
        "server.lon.liveperson.net":"https://z2.le.liveperson.net/a/", // UK
        "server.sy.liveperson.net":"https://z3.le.liveperson.net/a/" // SYD
    };

    // Convert string for answer type
    this.typeConvert = {
        "text":"Text field",
        "select-one":"Drop-down menu",
        "radio":"Radio button",
        "checkbox":"Check box",
        "textarea":"Text area",
    };

    // 
    this.campPreUrl = "/#camp!campaigns/web/";
    this.engPreUrl = "/engagement/";

    this.debugCookieName = 'LP_MTAG_DEBUG_MODE';

    this.chksiteId = '';

    this.showTimeinLog = false;
    this.showLogFilter = false;
    this.activeFilter = [];

    this.msgShown = false;

    this.timerPeriod = (typeof(lpMTagConfig)=='undefined' || typeof(lpMTagConfig.emtDebugTimerPeriod)=='undefined')?1:lpMTagConfig.emtDebugTimerPeriod;
    this.zindex = 200000;

    this.logMaxLines = (typeof(lpMTagConfig)=='undefined' || typeof(lpMTagConfig.mtagDebugMaxLine)=='undefined')? 500:lpMTagConfig.mtagDebugMaxLine;
    if ((typeof(lpMTagConfig)!='undefined' && typeof(lpMTagConfig.emtDebugPosX)!='undefined')) {
        this.posX = lpMTagConfig.emtDebugPosX;
    }
    else {
        this.posX= 10;
    }
    this.posY = (typeof(lpMTagConfig)=='undefined' || typeof(lpMTagConfig.emtDebugPosY)=='undefined')? 10:lpMTagConfig.emtDebugPosY;

    this.logWindowDimensionLimited = false;
    this.maxLogWindowMaxHeight = 300;
    this.maxLogWindowMaxWidth = 500;

    this.timestart = new Date();

    this.debugCookieName = 'LP_MTAG_DEBUG_MODE';
    this.debugCookieValue = 'cK1FoDtP';

    this.browser = 'IE';
    this.noValueStr = '-';

    this.log = [];
    this.logErr = [];
    this.logWarn = [];
    this.eventLog = {
        'dynButton' : {},
        'invite' : {}
    };

    this.msgSources = {'Not specified':{source: 'Not specified'}};

    this.ude = {};

    this.logShown = false;
    this.toolsShown = false;

    this.counters = {
        logLine : 0,
        logErr : 0,
        logWarn : 0,
        logOK : 0,
        connPOST : 0,
        connGET : 0
    };

    this._LOG_PLAY = 'play';
    this._LOG_STOP = 'stop';
    this._LOG_PAUSE = 'pause';
    this._LOG_TRASH = 'erase';
    this.logStatus = this._LOG_PLAY;

    this.logLineCnt =0;
    this.garbColStrCnt = 0;

    this.progressSymbols = ['-','\\','|','/'];
    this.progressIdx = 0;
    this.evalToolCnt =0;
    this.leChatProps = {
        numberOfButtons: 0,
        numberOfStickyButtons: 0,
        numberOfInvitations: 0,
        numberOfButtonsInPage: 0,
        numberOfStickyButtonsInPage: 0,
        numberOfInvitationsInPage: 0,
        ver: '',
        inPagePluginsArr: null,
        totalPluginsArr: null,
        engagementType: {
            button: 'button',
            sticky_button: 'sticky_button',
            invitation: 'invitation'
        },
        getNumberOfElements: function (type, inPage) {
            var count = 0;
            if (!lpMTagDebug.leChatRef) {
                return 0;
            }

            var arrObjs = inPage ? lpMTagDebug.leChatRef.inPagePluginsArr : lpMTagDebug.leChatRef.jsonsArr;
            if (typeof (arrObjs) != "undefined") {
                for (var id in arrObjs) {
                    if (arrObjs[id].type === type) {
                        count++;
                    }
                }
            }

            return count;
        }
    };

    // Open campaign in new window
    this.openCamp = function (campId){
        if(typeof(lpTag) != 'undefined')
        {
            var campUrl = this.consoleDomain[lpTag.getDomain()] + lpTag.site+ this.campPreUrl + campId;
            window.open(campUrl);
        }
    };

    // Open Engagement studio in new window
    this.openEng = function (campId,engId){
        if(typeof(lpTag) != 'undefined')
        {
            var engUrl = this.consoleDomain[lpTag.getDomain()] + lpTag.site+ this.campPreUrl + campId + this.engPreUrl + engId +"/studio";
            window.open(engUrl);
        }
    };

    this.generateHTML = function (){
        this.logCtrlPanelHTML = "<div id='LEILogPlay'><div id='LEILogPlayImg'></div></div>  \
                                <div id='LEILogStop'><div id='LEILogStopImg'></div></div>  \
                                <div id='LEILogErase'><div id='LEILogEraseImg'></div></div>  \
                            ";
        this.emtHtml = "<table id='LEIMainTable' cellspacing='0' cellpadding='0' border='0'>\
                            <tbody>\
                                <tr>\
                                    <td>\
                                        <table id='LEIMainTitleTable' width='100%' height='26px' cellspacing='0' cellpadding='0' border='0'>\
                                            <tbody>\
                                                <tr>\
                                                    <td id='emtDebugLogo'></td>\
                                                    <td id='LEIMainTitle'>Inspect Tool ver: "+this.ver+"</td>\
                                                    <td id='LEIMinimize'>\
                                                        <div class='LEIMiniWrapper'>\
                                                            <a href='javascript:;' alt='Close' title='Close'>\
                                                            <div id='LEIImgClose' class='LEICloseBtn'></div></a>\
                                                        </div>\
                                                        <div class='LEIMiniWrapper'>\
                                                            <a href='javascript:;' alt='Minimize / Maximize' title='Minimize / Maximize'>\
                                                            <div id='LEIImgMinimize' class='LEIMiniBtn'></div></a>\
                                                        </div>\
                                                    </td>\
                                                </tr>\
                                            </tbody>\
                                        </table>\
                                    </td>\
                                </tr>\
                                <tr id='LEIMonitorWindow'>\
                                    <td>\
                                        <table id='emtDebugMainMonitorTable' width='100%' cellspacing='0' cellpadding='0' border='0'>\
                                            <tbody>\
                                                <tr class='LEImainTableTopRow'>\
                                                    <td></td>\
                                                    <td colspan='2' class='LEILable'>Account : </td>\
                                                    <td colspan='2' class='LEImainTableTopRowAcc LEIEMTDivider' id='LEIEMTsiteId'>"+this.noValueStr+"</td>\
                                                    <td colspan='4' id='LEIDomain' class='LEIEMTDivider'>"+this.noValueStr+"</td>\
                                                    <td class = 'LEILable'>Section : </td>\
                                                    <td colspan='4' id='LEIEMTSection' class='LEIEMTDivider'>"+this.noValueStr+"</td>\
                                                    <td>\
                                                        <a id='LEIToggleLog' href='javascript:;'>\
                                                            <div id='LEIImgLog'></div>\
                                                        </a>\
                                                    </td>\
                                                </tr>\
                                                <tr class='LEImainTableNumberRow'><td style='height:5px'></td></tr>\
                                                <tr class='LEImainTableNumberRow'>\
                                                    <td></td>\
                                                    <td id='LEIENGcnt' colspan='2'>"+this.noValueStr+"</td>\
                                                    <td id='LEIEMBcnt' colspan='2'>"+this.noValueStr+"</td>\
                                                    <td id='LEIClosedcnt' colspan='2'>"+this.noValueStr+"</td>\
                                                    <td id='LEIENGAtt' colspan='2'>"+this.noValueStr+"</td>\
                                                    <td id='LEIStatusTimeOnPage' colspan='2'>"+this.noValueStr+"</td>\
                                                    <td id='LEIERRcnt'>"+this.noValueStr+"</td>\
                                                    <td id='LEIWARNcnt'>"+this.noValueStr+"</td>\
                                                    <td class='emtDebugOK' id='LEIOKcnt'>"+this.noValueStr+"</td>\
                                                </tr>\
                                                <tr class='LEImainTableLabelRow'>\
                                                    <td></td>\
                                                    <td colspan='2'>Disp ENG.</td>\
                                                    <td colspan='2'>Emb ENG.</td>\
                                                    <td colspan='2'>Closed ENG.</td>\
                                                    <td colspan='2'>ENG. Att</td>\
                                                    <td colspan='2'>Time on page</td>\
                                                    <td>ERR</td>\
                                                    <td>WARN</td>\
                                                    <td>OK</td>\
                                                </tr>\
                                                <tr class='LEImainTableNumberRow'><td style='height:5px'></td></tr>\
                                            </tbody>\
                                        </table>\
                                    </td>\
                                </tr>\
                                <tr id='LEIMainLogWindow'>\
                                    <td>\
                                        <table id='LEIMainLogWindowTable' width='600px' cellspacing='0' cellpadding='0' border='0'>\
                                            <tbody>\
                                                <tr id='LEIMessageWindowHeader'>\
                                                    <td id='LEIMessageWindowTitle'></td>\
                                                    <td id='LEIMessageWindowCtrlPanel'>\
                                                        </td>\
                                                    <td id='LEIMessageWindowClose' align='right'>\
                                                        <div style='float:right'><a href='javascript:;'>\
                                                            <div id='LEIImgCloseLog' border='0'></div>\
                                                        </a></div>\
                                                    </td>\
                                                </tr>\
                                                <tr id='LEIFilterRow' style='display:none;'>\
                                                    <td  colspan='3'>\
                                                        <div id='LEIFilterWindow'>FILTER GOES HERE</div>\
                                                    </td>\
                                                </tr\
                                                <tr>\
                                                    <td  colspan='3'>\
                                                        <div id='LEILogWindow'></div>\
                                                    </td>\
                                                </tr\
                                            </tbody>\
                                        </table>\
                                    </td>\
                                </tr>\
                                <tr id='LEIUtilWindow'>\
                                    <td>\
                                        <table id='LEIUtilTable' width='100%' cellspacing='0' cellpadding='0' border='0'>\
                                            <tbody>\
                                                <tr class='LEIUtilTopRow'>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                </tr>\
                                                <tr class='LEIUtilButtonsRow'>\
                                                    <td><input type='checkbox' id='incInv'><span style='color:#fff'>Include invisible questions</span></td>\
                                                    <td><input type='button' value='Scrape Survey' id='surveyScraper' onclick='lpMTagDebug.scrapeSurvey()'></td>\
                                                    <td><input type='button' value='Scrape Login Policy' id='getConf' onclick='lpMTagDebug.scrapeLoginPolicy()'></td>\
                                                </tr>\
                                                <tr class='LEIUtilBottomRow'>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                </tr>\
                                            </tbody>\
                                        </table>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td>\
                                        <table id='LEIMainStatusTable' height='20px' width='100%' cellspacing='0' cellpadding='0' border='0'>\
                                            <tbody>\
                                                <tr  class='LEIStatusBar'>\
                                                    <td><div id='LEITagStatIcon' class='LEITagStatNotFound'></div></td>\
                                                    <td id='LEITagStatText'>Tag not found.</div></td>\
                                                    <td >Ver :</td>\
                                                    <td id='LEILPTAGver'>"+this.noValueStr+"</td>\
                                                    <td >/</td>\
                                                    <td id='LEITAGver'>"+this.noValueStr+"</td>\
                                                    <td >Tag Load Time:</td>\
                                                    <td id='LEILoadTime'>"+this.noValueStr+"</td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td class='LEIStatusDivider'></td>\
                                                    <td id='LEIStatusImageTD'><div id='LEIStatusImage'>OK</div></td>\
                                                    <td class='LEIStatusDivider'></td>\
                                                    <td id='LEIMsgStatusLogPlayerStatus'>Log Active</td>\
                                                    <td class='LEIStatusDivider'></td>\
                                                    <td class='LEIStatusDivider'></td>\
                                                    <td id='LEIStatusResize' class='LEIStatusResize'></td>\
                                                </tr>\
                                            </tbody>\
                                        </table>\
                                    </td>\
                                </tr>\
                            </tbody>\
                        </table>";

        return this.emtHtml;
    };

    this.getMaxZindex = function () {
        //console.log('getMaxZindex');
        var allElems = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all; // or test for that too
        var maxZIndex = 0;
        for (var i = 0; i < allElems.length; i++) {
            var elem = allElems[i];
            var cStyle = null;
            if (elem.currentStyle) {
                cStyle = elem.currentStyle;
            }
            else if (document.defaultView && document.defaultView.getComputedStyle) {
                cStyle = document.defaultView.getComputedStyle(elem, "");
            }
            var sNum;
            if (cStyle) {
                sNum = Number(cStyle.zIndex);
            } else {
                sNum = Number(elem.style.zIndex);
            }
            if (!isNaN(sNum)) {
                maxZIndex = Math.max(maxZIndex, sNum);
            }
        }
        return maxZIndex;
    };

    this.addCss = function () {
        var newSS=document.createElement('link');
        newSS.rel='stylesheet';
        newSS.href= 'https://stoneyshou.github.io/css/mystyles.css';//'data:text/css,'+escape(styles);
        document.getElementsByTagName("head")[0].appendChild(newSS);

        // Add JQuery lib
        var newSt = document.createElement('script');
        newSt.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js";
        document.getElementsByTagName("head")[0].appendChild(newSt);

    };
    
    // get config info
    this.getConfigInfo = function (siteID, bearer){
        alert("Start!");
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://sy.ac.liveperson.net/api/account/85946726/configuration/le-targeting/onsite-locations/253856251?v=3.0",
          "method": "GET",
          "headers": {
            "authorization": "Bearer f6ec69f2b8cf243158d74d41e44814c03e6de0dd508cf5a722dd4965c049117d",
            "cache-control": "no-cache",
            "postman-token": "3bdb6385-45a7-ece2-f2ab-2365df20ff19"
          }
        }
        console.log("sent!");
        $.ajax(settings).done(function (response) {
          console.log(response);
        });
    }

    this.createGenericDiv = function (id, zindex, left, top, height, width, innerHtml, cursor, onclickFunction, isVisible, extraStyle) {
        if (! document.getElementsByTagName) {
            return;
        }
        var body = document.getElementsByTagName('body');
        if (! body) {
            return;
        }
        if (this.GetObj(id)!=null) { // do not create a div if it already exists
            return;
        }

        var divE = document.createElement('div');
        divE.setAttribute('id', id);
        divE.setAttribute('name', id);
        divE.style.zIndex= zindex;
        divE.style.position = 'absolute';
        divE.style.visibility = isVisible ? 'visible' : 'hidden';
        divE.style.left = left + 'px';
        divE.style.top = top + 'px';
        if (height!=null) {
            divE.style.height = height + 'px';
        }
        if (width!=null) {
            divE.style.width = width + 'px';
        }

        //divE.style.background = '#F1F5F9';
        divE.innerHTML = innerHtml;
        divE.style.cssText = divE.style.cssText + extraStyle + 'height:'+ height +';';

        if (cursor != null) {
            divE.style.cursor = cursor;
        }
        if (onclickFunction != null) {
            divE.onclick = onclickFunction;
        }

        if (document.body.firstChild != null) {
            document.body.insertBefore(divE, document.body.firstChild);
        }
        else {
            body.appendChild(divE);
        }
    };

    this.GetObj = function(id) {
        if (document.getElementById) {
            return document.getElementById(id);
        }
        else {
            if (document.all) {
                return document.all(id);
            }
        }
    };

    this.BrowserSniff = function() {
        if (document.layers) {
            return 'NS';
        }

        var agt=navigator.userAgent.toLowerCase();
        if (document.all) {
            // But is it really IE?
            // convert all characters to lowercase to simplify testing
            var is_opera = (agt.indexOf('opera') != -1);
            var is_konq = (agt.indexOf('konqueror') != -1);
            if(is_opera) {
                return 'OPR';
            } else {
                if(is_konq) {
                    return 'KONQ';
                } else {
                    // Really is IE
                    return 'IE';
                }
            }
        }
        if (document.getElementById) {
            var is_ff = (agt.indexOf('firefox') != -1);
            if (is_ff) {
                return 'FF';
            }
            return 'MOZ';
        }
        return 'OTHER';
    };

    this.attachEvents = function () {
        // add the drag and drop for the table
        var elem = this.GetObj('LEIMainTitle');
        var that = this;
        elem.onmousedown = function(event) { that.DragStart('LEImainDiv',event); };
        //////////

        elem = this.GetObj('LEIImgMinimize');
        elem.onclick = function () {that.minimizeAll();};

        elem = this.GetObj('LEIImgClose');
        elem.onclick = function () {that.closeWindow();};

        elem = this.GetObj('LEIToggleLog');
        //elem.onclick = function () {that.toggleLog();};
        elem.onclick = function () {that.scrapeSurvey();};

        elem = this.GetObj('LEIImgCloseLog');
        elem.onclick = function () {that.minimizeMsgDiv();};


        if (this.msgShown) {
            elem = this.GetObj('LEIStatusResize');
            elem.className = 'LEIStatusResize';
            elem.onmousedown = function(event) { that.resizeStart('LEILogWindow',event); };
        }
        else {
            elem = this.GetObj('LEIStatusResize');
            elem.className = 'LEIStatusNOResize';
        }

    };
    /*
     display the information of the engagement according to the given type
     */
    this.engagementLeChatInfo = function (type, inPage) {
        var arrObjs = inPage ? this.leChatRef.inPagePluginsArr : this.leChatRef.jsonsArr;
        var html = '';

        if (this.toolsShown) {
            this.toggleTools();
        }

        if (this.logShown) {
            this.toggleLog();
        }

        if (!this.leChatRef && typeof (arrObjs) != "undefined") {
            html = 'NO engagements defined';
        }

        html = '<table>';

        for (var id in arrObjs) {
            if (arrObjs[id].type === type) {
                html += '<tr><td>' + this.objectToString(arrObjs[id], undefined, true, 'LEIGeneralInfoNoBorder', true) + '</tr>';
                html += '<tr><td>----------------------------------------------------------</td></tr>'
            }
        }

        html += '</table>';


        this.showMsgWindow(false, 'Engagement Info', html,{width: 400, height: 100});
        return false;
    };

    this.highlight = function (e){
        e.className = "LEIClickable";
    }
    this.rmHighlight = function (e){
        e.className = '';
    }

    // Select Element Content
    this.seletElContent = function (el) {
        var body = document.body, range, sel;
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(el);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }
    }
    // Survey Scraper
    this.scrapeSurvey = function () {
        if (this.toolsShown) {
            this.toggleTools();
        }

        if (this.logShown) {
            this.toggleLog();
        }

        var that = this;

        var html = '';

        html = '<input type="button" value="Select All" id="selectAll" onclick ="lpMTagDebug.seletElContent(document.getElementById(\'LEISurveyTbl\'))">\
                <table>\
                    <thead>\
                    <tr>\
                        <td class="LEILable" width="30%">Question</td>\
                        <td class="LEILable" width="20%">Required?</td>\
                        <td class="LEILable" width="20%">Answer Type</td>\
                        <td class="LEILable">Answers</td>\
                    </tr>\
                    </thead>\
                    <tbody id="LEISurveyTbl">';

        if(1)
        {
            var queTable = document.getElementById("questionsTable").children[0];
            var queTableRows = queTable.children;

            for (var i = 1; i < queTableRows.length; i++) {
                // get visible status from column 6
                var visCol = queTableRows[i].children[5];
                var visImg = (visCol.children[0]).children[0];

                if (this.GetObj("incInv").checked || visImg.src.indexOf("grn") >= 0) {
                    // get question from column 4
                    var queCol = queTableRows[i].children[3];
                    var queTxt = (queCol.children[0]).innerText;
                    // get required setting from column 7
                    var reqCol = queTableRows[i].children[6];
                    var img = (reqCol.children[0]).children[0];
                    var reqTxt = "No";
                    if (img.src.indexOf("grn") >= 0)
                    {
                        reqTxt = "Yes";
                    }
                    // get answer type from column 5
                    var typeCol = queTableRows[i].children[4];
                    var typeTxt = typeCol.children[0].type;
                    // get answers 
                    var answerTxt = "\"";
                    if(typeTxt==="select-one")
                    {
                        var ansEl = typeCol.firstChild.nextSibling;
                        for (var si = 0; si < ansEl.length; si++) {
                            if(si > 0)
                            {
                                answerTxt += "\n";
                            }

                            answerTxt += ansEl[si].innerText;
                        }
                        console.log(answerTxt);
                    }
                    else if(typeTxt==="radio" || typeTxt==="checkbox")
                    {
                        var ansRadio = typeCol.childNodes;
                        for (var ri = 2; ri < ansRadio.length; ri+=3) {
                            if(ri>2)
                            {
                                answerTxt += "\n";
                            }
                            answerTxt += ansRadio[ri].data;
                        }
                    }
                    answerTxt += "\"";

                    html += '<tr>\
                                <td width="30%">'+ queTxt +'</td>';
                    html += '   <td width="20%">'+ reqTxt +'</td>';
                    html += '   <td width="20%">'+ this.typeConvert[typeTxt] +'</td>';
                    html += '   <td style="white-space:pre">'+ answerTxt +'</td>\
                             </tr>';
                }
            }
        }
        html += '</tbody></table>';


        this.showMsgWindow(false, 'Scraped Survey Info', html,{width: 500, height: 100});
        return false;
    };
    // Login Policy Scraper
    this.scrapeLoginPolicy = function () {
        if (this.toolsShown) {
            this.toggleTools();
        }

        if (this.logShown) {
            this.toggleLog();
        }

        var that = this;

        var html = '';

        html = '<input type="button" value="Select All" id="selectAll" onclick ="lpMTagDebug.seletElContent(document.getElementById(\'LEILoginPolicyTbl\'))">\
                <table>\
                    <thead>\
                    <tr>\
                        <td class="LEILable" width="50%">Name</td>\
                        <td class="LEILable" width="20%">Value</td>\
                    </tr>\
                    </thead>\
                    <tbody id="LEILoginPolicyTbl">';

        // Get config table
        var confContainer = document.getElementsByClassName('bkgdeditTable');
        var confTbls = confContainer[0].children[0].children[0].children[0].children;
        
        // Password Policy - Enabled
        var pwPolicyTbl = confTbls[0];
        var confName = "Password Policy";
        // var confEnabled = "No";
        var confValue = "Disabled";
        var enabledImg = pwPolicyTbl.children[0].children[2].children[2].children[0];
        if (enabledImg.src.indexOf("grn") >= 0)
        {
            confValue = "Enabled";
        }
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td width="20%" >'+ confValue +'</td>\
                 </tr>';

        var confsPWP = pwPolicyTbl.children[0].children[3].children[0].children[0].children[0].children;
        
        // Password Policy - Minimum number of characters
        var confMinChar = confsPWP[1];
        confName = " - Minimum number of characters";
        var select = confMinChar.children[1].children[0];
        var selectedIndex = confMinChar.children[1].children[0].selectedIndex;
        confValue = select[selectedIndex].text;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Maximum sequential characters (e.g. abcde)
        var confMaxSeqChar = confsPWP[2];
        confName = " - Maximum sequential characters (e.g. abcde)";
        select = confMaxSeqChar.children[1].children[0];
        selectedIndex = confMaxSeqChar.children[1].children[0].selectedIndex;
        confValue = select[selectedIndex].text;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Maximum occurrences of same character
        var confMaxSameChar = confsPWP[3];
        confName = " - Maximum occurrences of same character";
        select = confMaxSameChar.children[1].children[0];
        selectedIndex = confMaxSameChar.children[1].children[0].selectedIndex;
        confValue = select[selectedIndex].text;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Alpha character required
        var confAlphaReq = confsPWP[4];
        confName = " - Alpha character required";
        var confItem = confAlphaReq.children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Number character required
        var confNumReq = confsPWP[5];
        confName = " - Number character required";
        var confItem = confNumReq.children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Special character required
        var confSpReq = confsPWP[6];
        confName = " - Special character required";
        var confItem = confSpReq.children[0].children[0].children[0].children[0].children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Allow username in password
        var confAllowUsr = confsPWP[7];
        confName = " - Number character required";
        var confItem = confAllowUsr.children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Restrict commonly used password phrases
        var confRestComm = confsPWP[8];
        confName = " - Restrict commonly used password phrases";
        var confItem = confRestComm.children[0].children[0].children[0].children[0].children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Apply policy to current passwords
        var confAppCur = confsPWP[10];
        confName = " - Apply policy to current passwords";
        var confItem = confAppCur.children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Expires after number of days
        var confExpDay = confsPWP[13];
        confName = " - Expires after number of days";
        select = confExpDay.children[1].children[0];
        selectedIndex = confExpDay.children[1].children[0].selectedIndex;
        confValue = select[selectedIndex].text;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Notify users prior to expiration (days)
        var confNotify = confsPWP[14];
        confName = " - Notify users prior to expiration (days)";
        select = confNotify.children[1].children[0];
        selectedIndex = confNotify.children[1].children[0].selectedIndex;
        confValue = select[selectedIndex].text;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Notify via email
        var confNotifyEml = confsPWP[16];
        confName = " - Notify via email";
        var confItem = confNotifyEml.children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Send to user's email address
        var confSnedUsrEml = confsPWP[17];
        confName = " - Send to user's email address";
        var confItem = confSnedUsrEml.children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Send to this email address
        var confSnedUsrEml = confsPWP[18];
        confName = " - Send to this email address";
        var confItem = confSnedUsrEml.children[0].children[0];
        var confExtra = confSnedUsrEml.children[1].children[0];
        confValue = confItem.checked + " " + confExtra.value;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Notify via login alert
        var confNotifyAlert = confsPWP[19];
        confName = " - Notify via login alert";
        var confItem = confNotifyAlert.children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Prevent using previous number passwords
        var confPreNum = confsPWP[20];
        confName = " - Prevent using previous number passwords";
        select = confPreNum.children[1].children[0];
        selectedIndex = confPreNum.children[1].children[0].selectedIndex;
        confValue = select[selectedIndex].text;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Maximum changes per day
        var confMaxChange = confsPWP[21];
        confName = " - Maximum changes per day";
        select = confMaxChange.children[1].children[0];
        selectedIndex = confMaxChange.children[1].children[0].selectedIndex;
        confValue = select[selectedIndex].text;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Allow operators to save password for next login
        var confSavePwd = confsPWP[22];
        confName = " - Allow operators to save password for next login";
        var confItem = confSavePwd.children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Password Policy - Allow operators to save username for next login
        var confSaveUsrname = confsPWP[23];
        confName = " - Allow operators to save username for next login";
        var confItem = confSaveUsrname.children[0].children[0];
        confValue = confItem.checked;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // IP Policy - Enabled
        var ipPolicyTbl = confTbls[2];
        confName = "IP Policy";
        confValue = "Disabled";
        enabledImg = ipPolicyTbl.children[0].children[1].children[2].children[0];
        if (enabledImg.src.indexOf("grn") >= 0)
        {
            confValue = "Enabled";
        }
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td width="20%" >'+ confValue +'</td>\
                 </tr>';

        // Failed Login Policy - Enabled
        var failPolicyTbl = confTbls[4];
        confName = "Failed Login Policy";
        confValue = "Disabled";
        enabledImg = failPolicyTbl.children[1].children[1].children[2].children[0];
        if (enabledImg.src.indexOf("grn") >= 0)
        {
            confValue = "Enabled";
        }
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td width="20%" >'+ confValue +'</td>\
                 </tr>';

        // Failed Login Policy - Automatically disable operator after number of failed logins:
        var confAutoDis = failPolicyTbl.children[1].children[2];
        confName = " - Automatically disable operator after number of failed logins:";
        select = confAutoDis.children[0].children[0].children[0].children[0].children[1].children[0];
        confValue = select[select.selectedIndex].text;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Failed Login Policy - Number of minutes before re-enabling disabled operator:
        var confReEnable = failPolicyTbl.children[1].children[2].children[0].children[0].children[0].children[1];
        confName = " - Number of minutes before re-enabling disabled operator:";
        confItem = confReEnable.children[0].children[0].children[0].children[0].children[1].children[0];
        confValue = confItem.value;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Reset Password - Reset password notification email address:
        confItem = confTbls[6].children[0].children[2].children[1].children[0];
        confName = "Reset password notification email address:";
        confValue = confItem.value;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Auto-Disable Operator Policy - Enabled
        var autoDisOp = confTbls[8];
        confName = "Auto-Disable Operator Policy";
        confValue = "Disabled";
        enabledImg = autoDisOp.children[1].children[1].children[2].children[0];
        if (enabledImg.src.indexOf("grn") >= 0)
        {
            confValue = "Enabled";
        }
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td width="20%" >'+ confValue +'</td>\
                 </tr>';

        // Auto-Disable Operator Policy - Automatically disable operators after number of inactive days:
        confItem = autoDisOp.children[1].children[2].children[0].children[0].children[0].children[0].children[1].children[0];
        confName = " - Automatically disable operators after number of inactive days:";
        confValue = confItem.value;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td >'+ confValue +'</td>\
                 </tr>';

        // Idle Operator Policy - Enabled
        var idleOp = confTbls[10];
        confName = "Idle Operator Policy";
        confValue = "Disabled";
        enabledImg = idleOp.children[1].children[1].children[2].children[0];
        if (enabledImg.src.indexOf("grn") >= 0)
        {
            confValue = "Enabled";
        }
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td width="20%" >'+ confValue +'</td>\
                 </tr>';

        // Idle Operator Policy - Automatic action when operator is logged in but idle:
        confItem = idleOp.children[1].children[2].children[0].children[0].children[0].children[0];
        confName = " - Automatic action when operator is logged in but idle:";
        var radioNodes = confItem.children[1].childNodes;
        for (var ni = 0; ni < radioNodes.length - 1; ni += 4) {
            if(radioNodes[ni + 1].checked){
                confValue = radioNodes[ni + 2].textContent;
            }
        }
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td width="20%" >'+ confValue +'</td>\
                 </tr>';

        // Idle Operator Policy - Logout operator from the account after minutes of inactivity:
        confItem = idleOp.children[1].children[2].children[0].children[0].children[0].children[1];
        confName = " - Logout operator from the account after minutes of inactivity:";
        confValue = confItem.children[0].children[0].children[0].children[1].children[1].children[0].value;
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td width="20%" >'+ confValue +'</td>\
                 </tr>';
        
        // LivePerson Local Administrator Policy - Enabled
        var localAdmin = confTbls[13];
        confName = "LivePerson Local Administrator Policy";
        confValue = "Disabled";
        enabledImg = localAdmin.children[1].children[1].children[2].children[0];
        if (enabledImg.src.indexOf("grn") >= 0)
        {
            confValue = "Enabled";
        }
        html += '<tr>\
                    <td width="50%">'+ confName +'</td>';
        html += '   <td width="20%" >'+ confValue +'</td>\
                 </tr>';

        // End of Table
        html += '</tbody></table>';

        this.showMsgWindow(false, 'Scraped Login Policy', html,{width: 500, height: 100});
        return false;
    };

    // 
    this.dispEngInfo = function () {
        if (this.toolsShown) {
            this.toggleTools();
        }

        if (this.logShown) {
            this.toggleLog();
        }

        var that = this;

        var html = '';

        html = '<table>\
                    <tr>\
                        <td class="LEILable" width="10%">No.</td>\
                        <td class="LEILable" width="20%">Campaign ID</td>\
                        <td class="LEILable">Engagement ID</td>\
                    </tr>';

        if(this.store.impDisplay.length > 0)
        {
            var engArr = this.store.impDisplay;
            for (var i = 0; i < engArr.length; i++) {
                if (typeof(engArr[i]) == 'object') {
                    html += '<tr>\
                                <td>'+ (i+1) +'</td>';
                    html += '   <td id="campImp'+i+'" onclick="lpMTagDebug.openCamp('+engArr[i].campaign+')" \
                                                    onmouseover="lpMTagDebug.highlight(campImp'+i+')" \
                                                    onmouseout="lpMTagDebug.rmHighlight(campImp'+i+')">'+ engArr[i].campaign +'</td>';
                    html += '   <td id="engImp'+i+'" onclick="lpMTagDebug.openEng('+engArr[i].campaign+ ',' +engArr[i].engId+')" \
                                                     onmouseover="lpMTagDebug.highlight(engImp'+i+')" \
                                                     onmouseout="lpMTagDebug.rmHighlight(engImp'+i+')">'+ engArr[i].engId+'</td>\
                             </tr>';
                }
            }
        }
        html += '</table>';


        this.showMsgWindow(false, 'Displayed Engagement Info', html,{width: 500, height: 100});
        return false;
    };

    this.closedEngInfo = function () {
        if (this.toolsShown) {
            this.toggleTools();
        }

        if (this.logShown) {
            this.toggleLog();
        }

        var that = this;

        var html = '';

        html = '<table>\
                    <tr>\
                        <td class="LEILable" width="10%">No.</td>\
                        <td class="LEILable" width="20%">Campaign ID</td>\
                        <td class="LEILable">Engagement ID</td>\
                    </tr>';

        if(this.store.impClose.length > 0)
        {
            var engArr = this.store.impClose;
            for (var i = 0; i < engArr.length; i++) {
                if (typeof(engArr[i]) == 'object') {
                    html += '<tr>\
                                <td>'+ (i+1) +'</td>';
                    html += '   <td id="campcls'+i+'" onclick="lpMTagDebug.openCamp('+engArr[i].campaign+')" \
                                                    onmouseover="lpMTagDebug.highlight(campcls'+i+')" \
                                                    onmouseout="lpMTagDebug.rmHighlight(campcls'+i+')">'+ engArr[i].campaign +'</td>';
                    html += '   <td id="engcls'+i+'" onclick="lpMTagDebug.openEng('+engArr[i].campaign+ ',' +engArr[i].engId+')" \
                                                     onmouseover="lpMTagDebug.highlight(engcls'+i+')" \
                                                     onmouseout="lpMTagDebug.rmHighlight(engcls'+i+')">'+ engArr[i].engId+'</td>\
                             </tr>';
                }
            }
        }
        html += '</table>';


        this.showMsgWindow(false, 'Displayed Engagement Info', html,{width: 500, height: 100});
        return false;
    };

    this.dispEngAtt = function () {
        if (this.toolsShown) {
            this.toggleTools();
        }

        if (this.logShown) {
            this.toggleLog();
        }

        var that = this;

        var html = '';

        html = '<table>\
                    <tr>\
                        <td class="LEILable" width="10%">No.</td>\
                        <td class="LEILable" width="30%">Engagement Attributes</td>\
                        <td class="LEILable">Data</td>\
                    </tr>';

        if(this.store)
        {
            var index =0;
            for (name in this.store) {
                if ((name != 'impDisplay')&&(name != 'impClose')&&(name != 'pagediv')&&(name!='tabActive')) {
                    html += '<tr>\
                                <td>'+ ++index +'</td>';
                    html += '   <td>'+ name +'</td>';
                    html += '   <td width="400px">'+ JSON.stringify(this.store[name])+'</td>\
                             </tr>';
                }
            }
        }
        html += '</table>';


        this.showMsgWindow(false, 'Engagement Attributes', html,{width: 500, height: 100});
        return false;
    };

    this.dispEMBInfo = function () {
        if (this.toolsShown) {
            this.toggleTools();
        }

        if (this.logShown) {
            this.toggleLog();
        }

        var that = this;

        var html = '';

        html = '<table>\
                    <tr>\
                        <td class="LEILable" width="10%">No.</td>\
                        <td class="LEILable" width="20%">Div ID</td>\
                        <td class="LEILable"></td>\
                    </tr>';

        if(this.store.pagediv.length > 0)
        {
            var embArr = this.store.pagediv;
            for (var i = 0; i < embArr.length; i++) {
                if (typeof(embArr[i]) == 'object') {
                    html += '<tr>\
                                <td>'+ (i+1) +'</td>';
                    html += '   <td>'+ embArr[i].divId +'</td>';
                    html += '   <td></td></tr>';
                }
            }
        }
        html += '</table>';


        this.showMsgWindow(false, 'Embedded Engagement Info', html,{width: 500, height: 100});
        return false;
    };


    this.clearCompactSnippetMode = function () {
        //console.log('clearCompactSnippetMode');
        this.toggleTools();

        if (this.GetCookie(this.debugCookieName) == this.debugCookieValue) {// it already exists so delete it
            this.DeleteCookie(this.debugCookieName,'/');
        }
        else { // set it
            this.SetCookie(this.debugCookieName,this.debugCookieValue, null, '/');
        }

        return false;
    };


    this.toggleViewMode = function (id) {
        //console.log('toggleViewMode'+id);
        var elem = lpMTagDebug.GetObj('LEIObjectInfo-'+id);
        if (elem!=null) {
            if (elem.style.display=='none' || elem.style.display=='') {
                elem.style.display='block';
            }
            else {
                elem.style.display='none';
            }
        }

        return false;
    };

    this.objectToString = function(obj, delimiter, tableFormat, tableClass, recursive) {
        if (typeof(delimiter)=='undefined') {
            delimiter = ',';
        }
        if (typeof(tableFormat)=='undefined') {
            tableFormat = false;
        }
        if (typeof(recursive)=='undefined') {
            recursive = false;
        }
        var text='';
        var startText;

        if (tableFormat) {
            startText = "<table class='"+tableClass+"'>";
        }
        else {
            startText = '{';
        }
        var first = true;
        for (var name in obj) {
            if (first) {
                first = false;
            }
            else if (!tableFormat){
                text += delimiter;
            }

            var constructorName = '';
            if (obj[name]!=null && typeof(obj[name].constructor)!='undefined') {
                if (typeof(obj[name].constructor.name)!='undefined') {
                    constructorName = obj[name].constructor.name;
                }
                else {
                    if (obj[name].constructor.toString().indexOf('function')==0) {
                        constructorName = 'function';
                    }
                    else {
                        constructorName = obj[name].constructor.toString();
                    }
                }
            }
            if (recursive && typeof(obj[name])=='object' && obj[name]!=null && typeof(obj[name].constructor)!='undefined' &&
                    obj[name].constructor!=Image && obj[name].constructor!=Date && constructorName.indexOf('HTML')==-1) {
                if (tableFormat) {
                    var cnt = this.evalToolCnt++;
                    var retStr = this.objectToString(obj[name],delimiter, tableFormat, tableClass, recursive);
                    if (retStr!='') {
                        text += "<tr><th><a href=javascript:; onclick='lpMTagDebug.toggleViewMode("+cnt+")'>" + name + "</a></th><td id='LEIObjectInfo-"+cnt+"' class='LEIHiddenTD'>" +retStr + "</td>";
                    }
                    else {
                        text += "<tr><th>" + name + "</th><td id='LEIObjectInfo-"+cnt+"'>" +retStr + "</td>";
                    }
                }
                else {
                    text += "'" + name + "'"+ ':' + "'" + this.objectToString(obj[name],delimiter, tableFormat, tableClass, recursive) + "'";
                }
            }
            else {
                var value = (obj[name]==null)?'':obj[name].toString();
                value = value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                if (tableFormat) {
                    text += "<tr><th>" + name + "</th><td>" + value + "</td>";
                }
                else {
                    text += "'" + name + "'"+ ':' + "'" + value + "'";
                }
           }
        }
        if (text != '') {
            text = startText + text;
            if (tableFormat) {
                text += '</table>';
            }
            else {
                text += '}';
            }
        }
        return text;
    };

    this.logPlayer = function (action) {
        //console.log('logPlayer-'+ action);
        var that = this;
        var elem;
        switch (action) {
            case this._LOG_TRASH:
                this.log = [];
                this.clearLogDisplay();
                break;
            case this._LOG_PLAY:
                elem = this.GetObj('LEILogPlay');
                elem.onclick = function () {that.logPlayer(that._LOG_PAUSE);};
                elem = this.GetObj('LEILogPlayImg');
                elem.src = this.baseURL+'images/pause.png';
                elem = this.GetObj('LEIMsgStatusLogPlayerStatus');
                elem.innerHTML = 'Log Active';
                this.logStatus = action;
                this.clearLogDisplay();
                this.displayFullLog(this.log);
                break;
            case this._LOG_PAUSE:
                elem = this.GetObj('LEILogPlay');
                elem.onclick = function () {that.logPlayer(that._LOG_PLAY);};
                elem = this.GetObj('LEILogPlayImg');
                elem.src = this.baseURL+'images/play.png';
                elem = this.GetObj('LEIMsgStatusLogPlayerStatus');
                elem.innerHTML = 'Log Paused';
                this.logStatus = action;
                break;
            case this._LOG_STOP:
                elem = this.GetObj('LEILogPlay');
                elem.onclick = function () {that.logPlayer(that._LOG_PLAY);};
                elem = this.GetObj('LEILogPlayImg');
                elem.src = this.baseURL+'images/play.png';
                elem = this.GetObj('LEIMsgStatusLogPlayerStatus');
                elem.innerHTML = 'Log Stopped';
                this.logStatus = action;
                break;
        }
        return false;
    };

    this.toggleLog = function() {
        //console.log('toggleLog');
        if (this.toolsShown) {
            this.toggleTools();
        }
        var that = this;

        if (this.logShown) {
            this.logShown = false;
            this.hideMsgWindow();
        }
        else {
            this.logShown = true;
            var title = "<div id='LEILogToggleTime' class='LEITimeIcon'></div>" +
                        "<div id='LEILogToggleFilter' class='LEIFilterIcon'></div>"+
                        "<div class='LEILogTitle'>EMT Log</div>";
            this.showMsgWindow(true, title);
            var elem = this.GetObj('LEILogToggleTime');
            elem.onclick = function () {that.toggleLogTime(); return false;};

            var elem = this.GetObj('LEILogToggleFilter');
            elem.onclick = function () {that.toggleLogFilter(); return false;};

            this.displayFullLog(this.log);
        }
        this.resizeShowHideImage();
        return false;
    };

    this.toggleLogFilter = function () {
        this.showLogFilter = !this.showLogFilter;
        if (this.showLogFilter) {
            var html = '<table><tr>';
            var col = [];
            col[0] = '';
            col[1] = '';
            var idx=0;
            for (var name in this.msgSources) {
                if (typeof(this.msgSources[name])=='object' && this.msgSources[name].source) {
                    var checked = '';
                    for (var i=0; i<this.activeFilter.length; i++) {
                        if (name == this.activeFilter[i]) {
                            checked = 'checked';
                            break;
                        }
                    }
                    col[idx] += '<input name="LEIFilterChoice" value="' + name + '" type="checkbox" '+checked+'>'+name+'</input><br>';
                    (idx==0)? idx=1:idx=0;
                }
            }
            html += '<td>'+col[0]+'</td>';
            html += '<td>'+col[1]+'</td>';
            html += "<td align='center'><a id='LEILogToggleFilterApply' href=javascript:;><img src='" + this.baseURL + "images/apply.png' border='0'/></td></a>";
            html += "<td align='center'><a id='LEILogToggleFilterCancel' href=javascript:;><img src='" + this.baseURL + "images/cancel.png' border='0'/></td></a>";
            html += '</tr></table>';
            var el = this.GetObj('LEIFilterWindow');
            if (el!=null) {
                el.innerHTML = html;
                var that = this;
                var elem = this.GetObj('LEILogToggleFilterApply');
                elem.onclick = function () {that.logFilterApply(); return false;};
                elem = this.GetObj('LEILogToggleFilterCancel');
                elem.onclick = function () {that.logFilterCancel(); return false;};
            }
            this.showObj('LEIFilterRow');
        }
        else {
            this.hideObj('LEIFilterRow');
        }
    };

    this.logFilterCancel = function () {
        this.showLogFilter = !this.showLogFilter;
        this.activeFilter = [];
        this.hideObj('LEIFilterRow');
        this.displayFullLog(this.log);
    };

    this.logFilterApply = function () {
        this.showLogFilter = !this.showLogFilter;
        this.activeFilter = [];
        this.hideObj('LEIFilterRow');
        var elems = document.getElementsByName("LEIFilterChoice");
        for (var i=0; i< elems.length; i++) {
            if (elems[i].checked) {
                this.activeFilter[this.activeFilter.length] = elems[i].value;
            }
        }
        this.displayFullLog(this.log);
    };

    this.toggleLogTime = function() {
        this.showTimeinLog = !this.showTimeinLog;
        this.displayFullLog(this.log);
        return false;
    };

    this.hideMsgWindow = function () {
        this.msgShown = false;
        if (this.logShown) {
            this.logShown = false;
        }
        this.hideObj('LEIMainLogWindow', true);
        this.GetObj('LEILogWindow').innerHTML = '';
        this.resizeShowHideImage();
    };

    this.showMsgWindow = function (withLogCtrl, title, html, dimensions) {
        //console.log('showMsgWindow'+this.browser);
        this.msgShown = true;
        this.resizeShowHideImage();
        this.showTR('LEIMainLogWindow');
        this.showObj('LEIMainLogWindow', false);
        var elem;
        if (typeof(withLogCtrl)!='undefined' && withLogCtrl) {
            this.GetObj('LEIMessageWindowCtrlPanel').innerHTML = this.logCtrlPanelHTML;
            var that = this;
            elem = this.GetObj('LEILogPlay');
            elem.onclick = function () {that.logPlayer(that._LOG_PAUSE);};

            elem = this.GetObj('LEILogStop');
            elem.onclick = function () {that.logPlayer(that._LOG_STOP);};

            elem = this.GetObj('LEILogErase');
            elem.onclick = function () {that.logPlayer(that._LOG_TRASH);};
        }
        else {
            this.GetObj('LEIMessageWindowCtrlPanel').innerHTML = '';
        }
        if (title) {
            this.GetObj('LEIMessageWindowTitle').innerHTML = title;
        }
        if (html) {
            this.GetObj('LEILogWindow').innerHTML = html;
        }
        if (typeof(dimensions)!='undefined' && !this.resized) {
            elem = this.GetObj('LEILogWindow');
            if (dimensions.width) {
                //elem.style.width = dimensions.width + 'px';
                elem.style.width = '100%';
            }
            if (dimensions.height) {
                elem.style.height = dimensions.height + 'px';
            }
            elem.style.overflow = 'auto';
        }
    };

    this.toggleTools = function() {
        //console.log('toggleTools');
        if (this.toolsShown) {
            this.toolsShown = false;
            this.hideObj('LEIToolsDiv');
        }
        else {
            this.toolsShown = true;
            var elem;
            if (typeof(lpMTag)!='undefined') {
                elem = this.GetObj('LEIStopStartEMT');
                if (lpMTag.stopMTag){
                    elem.innerHTML = 'Start EMT';
                }
                else {
                    elem.innerHTML = 'Stop EMT';
                }
            }


            if (typeof(lpMTagConfig)=='undefined' || typeof(lpMTagConfig.lpServer)=='undefined' || typeof(lpMTagConfig.lpNumber)=='undefined') {
                this.hideObj('LEIAdminArea');
            }
            else {
                this.showObj('LEIAdminArea');
            }

            var dimensions = this.getElWidthHeight('LEIToggleTools','LEImainDiv');
            elem = this.GetObj('LEIToolsDiv');
            elem.style.left = (dimensions.ul.x) + 'px';
            elem.style.top = (dimensions.br.y+3) + 'px';
            this.showObj('LEIToolsDiv');
        }
        return false;
    };

    this.updateConfig = function() {
        ////console.log('updateConfig');
        var that = this;
        var updated = false;

        // If core tag detected
        if(typeof(lpMTag) != 'undefined')
        {
            elem = this.GetObj('LEITagStatIcon');
            if(elem.className != 'LEITagStatWarn'){
                updated = true;
                elem.className = 'LEITagStatWarn';
                elem = this.GetObj('LEITagStatText');
                elem.innerHTML = 'Old monitor tag';
            }
        }

        // Get info from lpTag
        if (typeof(lpTag)!='undefined') {

            // Update Tag status
            elem = this.GetObj('LEITagStatIcon');
            if((elem.className != 'LEITagStatOk') && (lpTag.site != undefined)){
                elem.className = 'LEITagStatOk';
                updated = true;
                elem = this.GetObj('LEITagStatText');
                elem.innerHTML = 'Tag detected.';
            }


            // Update time on page
            var timenow = new Date();
            var difDate = new Date();

            this.timestart = (lpTag._timing.contReady>0)?new Date(lpTag._timing.contReady) : this.timestart;

            var dif = timenow.getTime() - this.timestart.getTime();
            difDate.setTime(dif);
            var minTxt =  (difDate.getUTCMinutes()>0)? (difDate.getUTCMinutes()+'m ') : '';
            var hourTxt = (difDate.getUTCHours()>0)?(difDate.getUTCHours() + 'h '):'';
            var secTxt = difDate.getUTCSeconds() + 's';
            var timeText = hourTxt + minTxt + secTxt;
            elem = this.GetObj('LEIStatusTimeOnPage');
            elem.innerHTML = timeText;
            

            // Get site ID
            var siteId = lpTag.site || "Not Found";
            this.store = (typeof(lpTag.sdes.inspect) === 'function')? lpTag.sdes.inspect().store : {};

            elem = this.GetObj('LEIEMTsiteId');
            if(elem.innerHTML != siteId){
                updated = true;
                elem.innerHTML = siteId;
            }

            // Get Engagement attributes number
            var ENGAttCnt = 0;
            for(name in this.store){
                if((name != 'impDisplay')&&(name != 'impClose')&&(name != 'pagediv')&&(name!='tabActive'))
                    ENGAttCnt ++;
            }
            if(ENGAttCnt > 0){
                elem = this.GetObj('LEIENGAtt');
                elem.innerHTML = ENGAttCnt;
                elem.style.cursor = 'pointer';
                elem.onclick = function () {that.dispEngAtt()};
            }
            // Get server domain 
            var domainStr = (typeof(lpTag.getDomain)==='function')?lpTag.getDomain() : this.noValueStr;
            elem = this.GetObj('LEIDomain');
            if ((elem.innerHTML != domainStr) && domainStr != 'undefined') {
                updated = true;
                elem.innerHTML = domainStr;
            }
            
            // Get section
            if(lpTag.section != '')
            {
                elem = this.GetObj('LEIEMTSection');
                updated = true;
                elem.innerHTML = lpTag.section;
            }

            // Get Engagement impression count
            var dispEngs = this.store.impDisplay;
            if(typeof(dispEngs) != 'undefined')
            {   
                var engCnt = dispEngs.length;
                elem = this.GetObj('LEIENGcnt');
                if(elem.innerHTML != engCnt)
                {    
                    updated = true;
                    elem.innerHTML = engCnt;
                    elem.onclick = function(){that.dispEngInfo()};
                    elem.className='emtDebugInfo';
                }
            }

            // Get Embedded Engagement count
            var emds = this.store.pagediv;
            if(typeof(emds) != 'undefined')
            {   
                var embCnt = emds.length;
                elem = this.GetObj('LEIEMBcnt');
                if(elem.innerHTML != embCnt)
                {    
                    updated = true;
                    elem.innerHTML = embCnt;
                    elem.onclick = function(){that.dispEMBInfo()};
                    elem.className='emtDebugInfo';
                }
            }

            // Get closed engagement count
            var closEngs = this.store.impClose;
            if(typeof(closEngs)!='undefined')
            {
                var engCnt = closEngs.length;
                elem = this.GetObj('LEIClosedcnt');
                if(elem.innerHTML != engCnt)
                {    
                    updated = true;
                    elem.innerHTML = engCnt;
                    elem.onclick = function(){that.closedEngInfo()};
                    elem.className='emtDebugInfo';
                }
            }

            // Get tag load time
            elem = this.GetObj('LEILoadTime');
            var startTime = lpTag._timing.start||0;
            var readyTime = lpTag._timing.contReady||0;

            var loadTime = (readyTime - startTime)>0?(readyTime - startTime):'N/A';
            if((elem.innerHTML === this.noValueStr))
            {
                updated = true;
                elem.innerHTML = loadTime + 'ms';
            }

            this.leChatRef = (typeof (lpTagConfig) != "undefined") && (typeof (lpTagConfig.tagPlugins) != "undefined") ? lpTagConfig.tagPlugins : null;
            this.leChatProps.ver = (typeof (lpTagConfig) != "undefined") ? ' (' + lpTagConfig._ver + ')' : '';

            // if (typeof (lpTagConfig) != "undefined") {
            //     this.leChatProps.ver = ' (VS: ' + lpTagConfig._ver + ')';
            // }

            // if (typeof (LEChat) != "undefined" && typeof (LEChat.conf) != "undefined" && typeof (LEChat.conf.ver) != "undefined") {
            //     this.leChatProps.ver += ' (LE: ' + LEChat.conf.ver + ')';
            // }

            var lpTagVer = typeof (lpTag) != "undefined" ? lpTag._v : this.noValueStr;
            elem = this.GetObj('LEILPTAGver');
            if (elem.innerHTML != lpTagVer) {
                updated = true;
                elem.innerHTML = lpTagVer;
            }

            var tagVer = typeof (lpTag) != "undefined" ? lpTag._tagv : this.noValueStr;
            elem = this.GetObj('LEITAGver');
            if (elem.innerHTML != tagVer) {
                updated = true;
                elem.innerHTML = tagVer;
            }


            if (this.counters.logOK > 0) {
                elem = this.GetObj('LEIOKcnt');
                if (elem.innerHTML != this.counters.logOK) {
                    updated = true;
                    elem.innerHTML = this.counters.logOK;
                }
                elem.className='emtDebugOK';
            }

            if (this.counters.logWarn > 0) {
                elem = this.GetObj('LEIWARNcnt');
                if (elem.innerHTML != this.counters.logWarn) {
                    updated = true;
                    elem.innerHTML = this.counters.logWarn;
                }
                elem.className='emtDebugWarn';
                elem.onclick = function () {that.logShowErrWarn('warn');};

                if (this.counters.logErr == 0) {
                    elem = this.GetObj('LEIStatusImage');
                    elem.innerHTML = "Warning";
                    elem.style.cursor ='pointer';
                    elem.onclick = function () {that.maximizeAll(); that.logShowErrWarn('warn');};
                 }
            }

            if (this.counters.logErr > 0) {
                elem = this.GetObj('LEIERRcnt');
                if (elem.innerHTML != this.counters.logErr) {
                    updated = true;
                    elem.innerHTML = this.counters.logErr;
                }
                elem.className='emtDebugError';
                elem.onclick = function () {that.logShowErrWarn('error');};

                elem = this.GetObj('LEIStatusImage');
                elem.innerHTML = 'Error';
                elem.style.cursor ='pointer';
                elem.onclick = function () {that.maximizeAll(); that.logShowErrWarn('error');};
            }


        }
        this.timerRef = setTimeout(function() {that.updateConfig();},this.timerPeriod*1000);
    };

    this.minimizeAll = function() {
        //console.log('minimizeAll');
        var that = this;

        if (this.toolsShown) {
            this.toggleTools();
        }
        if (this.logShown) {
            this.toggleLog();
        }

        this.hideObj('LEIMonitorWindow');
        this.hideObj('LEIMainLogWindow');

        var elem = this.GetObj('LEIImgMinimize');
        elem.className = 'LEIMaxBtn';
        elem.onclick = function () {that.maximizeAll();};

        return false;
    };

    this.closeWindow = function () {
        var parentNd = document.body;
        var childNd = document.getElementById('LEImainDiv');
        parentNd.removeChild(childNd);
    };

    this.showTR = function (id) {
        //console.log('showTR');
        if (this.browser == 'IE') {
            this.GetObj(id).style.display='block';
        }
        else {
            this.GetObj(id).style.display='table-row';
        }
        this.showObj(id, false);
    };

    this.maximizeAll = function() {
        //console.log('maximizeAll');
        var that = this;

        this.showTR('LEIMonitorWindow');

        var elem = this.GetObj('LEIImgMinimize');
        elem.className = 'LEIMiniBtn';
        elem.onclick = function () {that.minimizeAll();};

        return false;
    };

    this.minimizeMsgDiv = function() {
        //console.log('minimizeMsgDiv');
        this.hideMsgWindow();
        return false;
    };

    this.resizeShowHideImage = function () {
        var elem = this.GetObj('LEIStatusResize');
        if (this.msgShown) {
            var that=this;
            elem.className = 'LEIStatusResize';
            elem.onmousedown = function(event) { that.resizeStart('LEILogWindow',event); };
        }
        else {
            elem.className = 'LEIStatusNOResize';
            elem.onmousedown = null;
        }
    };

    this.resizeObj = null;
    this.resized = false;
    this.resizeStart = function(id,event) {
        //console.log('resizeStart');
        if (!this.msgShown) {
            return false;
        }
        this.resizeObj = this.GetObj(id);
        if (this.resizeObj== null) {
            alert('NO resize Object:'+id);
            return;
        }
        this.resized = true;
        var x,y;
        // Get cursor position with respect to the page.
        if (this.browser == 'IE') {
            x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
            y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        }
        else {
            x = event.clientX + window.scrollX;
            y = event.clientY + window.scrollY;
        }

        // Save starting positions of cursor and element.
        this.resizeCursorStartX = x;
        this.resizeCursorStartY = y;
        this.resizeElStartDimen  = this.getElWidthHeight(id);

        // Capture mousemove and mouseup events on the page.
        if (this.browser == 'IE') {
            document.attachEvent("onmousemove", lpMTagDebug.resizeGo);
            document.attachEvent("onmouseup",   lpMTagDebug.resizeStop);
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        }
        else {
            document.addEventListener("mousemove", lpMTagDebug.resizeGo,   true);
            document.addEventListener("mouseup",   lpMTagDebug.resizeStop, true);
            event.preventDefault();
        }

        return false;
    };

    this.resizeGo = function(event) {
        //console.log('resizeGo'+ ' w='+lpMTagDebug.resizeElStartDimen.width + ' h='+lpMTagDebug.resizeElStartDimen.height + ' curX:'+lpMTagDebug.resizeCursorStartX + ' curY:'+lpMTagDebug.resizeCursorStartY);

        var x, y;

        // Get cursor position with respect to the page.
        if (lpMTagDebug.browser == 'IE') {
            x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
            y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        }
        else {
            x = event.clientX + window.scrollX;
            y = event.clientY + window.scrollY;
        }
        var width = lpMTagDebug.resizeElStartDimen.width + (x - lpMTagDebug.resizeCursorStartX);
        var height = lpMTagDebug.resizeElStartDimen.height + (y - lpMTagDebug.resizeCursorStartY);

        if (width>=0) {
            lpMTagDebug.resizeObj.style.width = width + 'px';
        }
        if (height>=0) {
            lpMTagDebug.resizeObj.style.height = height + 'px';
        }

        var dimension = lpMTagDebug.getElWidthHeight('LEIMainLogWindow');
        if (width < dimension.width) {
            if (width>=0) {
                lpMTagDebug.resizeObj.style.width = (dimension.width) + 'px';
            }
        }

        return false;
    };

    this.resizeStop = function() {
        //console.log('resizeStop');
        // Stop capturing mousemove and mouseup events.
        if (lpMTagDebug.browser == 'IE') {
            document.detachEvent("onmousemove", lpMTagDebug.resizeGo);
            document.detachEvent("onmouseup",   lpMTagDebug.resizeStop);
        }
        else {
            document.removeEventListener("mousemove", lpMTagDebug.resizeGo,   true);
            document.removeEventListener("mouseup",   lpMTagDebug.resizeStop, true);
        }

        return false;
    };

    this.getElWidthHeight = function (id, limitByID) {
        //console.log('getElWidthHeight');
        var elem = this.GetObj(id);
        if (elem==null) {
            alert('Error getting the element:'+id);
            return false;
        }

        var pointUL = {};
        pointUL.x = elem.offsetLeft;
        pointUL.y = elem.offsetTop;
        var parent = elem.offsetParent;
        while (parent && parent.id!=limitByID && (parent.tagName.toUpperCase() != 'BODY')) {
            pointUL.x += parent.offsetLeft;
            pointUL.y += parent.offsetTop;
            parent = parent.offsetParent;
        }
        var pointBR = {};
        pointBR.x = pointUL.x + elem.offsetWidth;
        pointBR.y = pointUL.y + elem.offsetHeight;
        return {width: (pointBR.x-pointUL.x) , height: (pointBR.y-pointUL.y), ul : pointUL, br : pointBR};
    };

    this.dragObj = null;
    this.DragStart = function(id,event) {
        if (this.toolsShown) {
            this.hideObj('LEIToolsDiv');
            this.toolsShown = false;
        }

        this.dragObj = this.GetObj(id);
        if (this.dragObj== null) {
            alert('NO drag Object');
            return;
        }
        var x,y;
        // Get cursor position with respect to the page.
        if (this.browser == 'IE') {
            x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
            y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        }
        else {
            x = event.clientX + window.scrollX;
            y = event.clientY + window.scrollY;
        }

        //console.log('DragStart x='+x + ' y='+y);

        // Save starting positions of cursor and element.
        this.dragCursorStartX = x;
        this.dragCursorStartY = y;
        this.dragElStartLeft  = parseInt(this.dragObj.style.left, 10);
        this.dragElStartTop   = parseInt(this.dragObj.style.top,  10);

        if (isNaN(this.dragElStartLeft)) {
            this.dragElStartLeft = 0;
        }
        if (isNaN(this.dragElStartTop))  {
            this.dragElStartTop  = 0;
        }

        // Update element's z-index.
        //this.dragObj.style.zIndex = ++this.dragzIndex;

        // Capture mousemove and mouseup events on the page.
        if (this.browser == 'IE') {
            document.attachEvent("onmousemove", lpMTagDebug.dragGo);
            document.attachEvent("onmouseup",   lpMTagDebug.dragStop);
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        }
        else {
            document.addEventListener("mousemove", lpMTagDebug.dragGo,   true);
            document.addEventListener("mouseup",   lpMTagDebug.dragStop, true);
            event.preventDefault();
        }
        return false;
    };

    this.dragGo = function(event) {

        var x, y;

        // Get cursor position with respect to the page.
        if (lpMTagDebug.browser == 'IE') {
            x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
            y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        }
        else {
            x = event.clientX + window.scrollX;
            y = event.clientY + window.scrollY;
        }
        ////console.log('DragGo x='+x +' y='+y);
        // Move drag element by the same amount the cursor has moved.
        var posx = lpMTagDebug.dragElStartLeft + x - lpMTagDebug.dragCursorStartX;
        if (posx<1) {
            posx=1;
        }
        var posy = lpMTagDebug.dragElStartTop  + y - lpMTagDebug.dragCursorStartY;
        if (posy<1) {
            posy=1;
        }
        lpMTagDebug.dragObj.style.left = posx + "px";
        lpMTagDebug.dragObj.style.top  = posy + "px";

        if (lpMTagDebug.browser == 'IE') {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        }
        else {
            event.preventDefault();
        }
        return false;
    };

    this.dragStop = function() {
        ////console.log('DragStop');
        // Stop capturing mousemove and mouseup events.
        if (lpMTagDebug.browser == 'IE') {
            document.detachEvent("onmousemove", lpMTagDebug.dragGo);
            document.detachEvent("onmouseup",   lpMTagDebug.dragStop);
        }
        else {
            document.removeEventListener("mousemove", lpMTagDebug.dragGo,   true);
            document.removeEventListener("mouseup",   lpMTagDebug.dragStop, true);
        }
        return false;
    };

    this.hideObj = function(id, useBlock) {
        if (typeof(useBlock)=='undefined') {
            useBlock = true;
        }
        var el = this.GetObj(id);
        if (el!=null) {
            el.style.visibility = 'hidden';
            if (useBlock) {
                el.style.display = 'none';
            }
        }
    };

    this.showObj = function(id, useBlock) {
        if (typeof(useBlock)=='undefined') {
            useBlock = true;
        }
        var el = this.GetObj(id);
        if (el!=null) {
            el.style.visibility = 'visible';
            if (useBlock) {
                el.style.display = 'block';
            }
        }
    };

    this.Display = function (str, level, source) {
        //console.log('Display');
        if (str.indexOf('Garbage Collection')>-1) {
            this.garbColStrCnt++;
            if (this.garbColStrCnt==10) {
                str = 'PAUSING LOG DISPLAY';
                level = 'WARN';
            }
            else if (this.garbColStrCnt>10) {
                return;
            }
        }
        else {
            this.garbColStrCnt = 0;
        }

        if (str.indexOf('GET')>-1) {
            this.counters.connGET++;
        }

        if (str.indexOf('POST')>-1) {
            this.counters.connPOST++;
        }
        var pnt,
            idx,
            event;
        if (str.indexOf('EVENT')>-1) { // store the events separately
            if (str.indexOf('DynBut')>-1) {// dynamic button event
                // which button
                var butID = null;
                pnt = null;
                idx = str.indexOf('lpMTagConfig.dynButton');
                if (idx!=-1) {
                    pnt =  idx+'lpMTagConfig.dynButton'.length;
                    butID = parseInt(str.substr(pnt),10);
                }

                if (butID==null) {
                    //probably multichannel button

                    idx = str.indexOf('DynBut') + 'DynBut '.length;
                    var butName = str.substring(idx,(str.indexOf('EVENT')-1));
                    for (var i=0;i<lpMTagConfig.dynButton.length; i++) {
                        if (lpMTagConfig.dynButton[i].name == butName) {
                            butID = i;
                            break;
                        }
                    }
                }

                event = str.substr(str.indexOf('EVENT') +' EVENT:'.length);

                if (typeof(this.eventLog.dynButton['but'+butID])=='undefined') {
                    this.eventLog.dynButton['but'+butID] = [];
                }
                this.eventLog.dynButton['but'+butID][this.eventLog.dynButton['but'+butID].length] = event;

                //console.log('Event DB='+event);
            }
            else if (str.indexOf('lpMTagConfig.invite')>-1) {// invite event
                // which invite
                idx = str.indexOf('lpMTagConfig.invite');
                pnt =  idx+'lpMTagConfig.invite'.length;
                var invID = parseInt(str.substr(pnt),10);
                if (isNaN(invID)) {
                    pnt = idx+'lpMTagConfig.inviteMC'.length;
                    invID = parseInt(str.substr(pnt),10);
                }
                event = str.substr(pnt + invID.toString().length +' EVENT: '.length);

                if (typeof(this.eventLog.invite['inv'+invID])=='undefined') {
                    this.eventLog.invite['inv'+invID] = [];
                }
                this.eventLog.invite['inv'+invID][this.eventLog.invite['inv'+invID].length] = event;

            }
        }


        if (level == 'ERROR') {
            this.counters.logErr ++;
        }
        else if (level == 'EXEC-OK') {
            this.counters.logOK ++;
        }
        else if (level == 'WARN') {
            this.counters.logWarn ++;
        }
        else {
            this.counters.logOK ++;
        }
        this.counters.logLine ++;

        if (this.log.length == this.logMaxLines) {
            this.log.shift();
        }

        var timeStamp = new Date();
        var hours = timeStamp.getHours();
        var minutes = timeStamp.getMinutes();
        var seconds = timeStamp.getSeconds();

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        var time = hours + ':' + minutes + ':' + seconds;
        if (typeof(source)=='undefined') {source = 'Not specified';}
        var logLine = {'msg':str, 'time': time,'level':level, source : source};
        if (typeof(this.msgSources[source])=='undefined') {
            this.msgSources[source] = {source : source};
        }

        if (level == 'ERROR') {
            this.logErr[this.logErr.length] = logLine;
        }
        else if (level == 'WARN') {
            this.logWarn[this.logWarn.length] = logLine;
        }

        if (this.logStatus!=this._LOG_STOP) {
            this.log[this.log.length] = logLine;
            //console.log('length='+this.log.length);
            if (this.logShown && this.logStatus!=this._LOG_PAUSE) {
                this.printLogLine(logLine);
            }
        }
    };

    this.displayFullLog = function(log) {
        //console.log('displayFullLog');
        this.clearLogDisplay();
        for (var i=0; i<log.length; i++) {
            this.printLogLine(log[i]);
        }
    };

    this.clearLogDisplay = function() {
        //console.log('clearLogDisplay');
        var divE = this.GetObj('LEILogWindow');
        divE.innerHTML = '';
    };

    this.logShowErrWarn = function(logType) {
        //console.log('logShowErrWarn');
        if (this.logShown) {
            this.toggleLog();
        }
        if (this.toolsShown) {
            this.toggleTools();
        }

        var log;
        if (logType=='warn') {
            log = this.logWarn;
        }
        else if (logType=='error') {
            log = this.logErr;
        }
        else {
            alert('wrong logType='+logType);
            return;
        }

        this.showMsgWindow(false, 'Error Messages from Log !!!Not updated Live!!!', '',{width: 400, height: this.maxLogWindowMaxHeight});

        this.displayFullLog(log);
        return false;
    };

    this.printLogLine = function (logLine) {
        //console.log('printLogLine');
        var inFilter = true;
        if (this.activeFilter.length > 0 ) {
            inFilter = false;
            for (var i=0; i < this.activeFilter.length ; i++) {
                if (logLine.source == this.activeFilter[i]) {
                    inFilter = true;
                    break;
                }
            }
            if (!inFilter) {
                return;
            }
        }
        var styleClass = '';
        if (logLine.level == 'ERROR') {
            styleClass = 'LEILogMessageERROR';
        }
        else if (logLine.level == 'EXEC-OK') {
            styleClass = 'LEILogMessageOK';
        }
        else if (logLine.level == 'WARN') {
            styleClass = 'LEILogMessageWARN';
        }
        else {
            styleClass = 'LEILogMessageDEBUG';
        }

        var divE = this.GetObj('LEILogWindow');
        var textDiv = document.createElement('div');
        textDiv.id = 'mtagTextDiv-'+ this.counters.logLine;
        textDiv.className = styleClass;
        textDiv.innerHTML = (this.showTimeinLog?(logLine.time + ' '):' ') + logLine.msg;
        if (divE.firstChild != null) {
            divE.insertBefore(textDiv,divE.firstChild);
        }
        else {
            divE.appendChild(textDiv);
        }
        var dimensions = this.getElWidthHeight('LEILogWindow');
        var elem;
        if (!this.resized && dimensions.height > this.maxLogWindowMaxHeight) {

            elem = this.GetObj('LEILogWindow');
            elem.style.height = this.maxLogWindowMaxHeight + 'px';
            if (!this.logWindowDimensionLimited) {
                elem.style.width = (dimensions.width + 15) + 'px';
            }
            elem.style.overflow = 'auto';
            this.logWindowDimensionLimited = true;
        }

        if (!this.resized && dimensions.width > this.maxLogWindowMaxWidth) {
            elem = this.GetObj('LEILogWindow');
            elem.style.width = this.maxLogWindowMaxWidth + 'px';
            elem.style.overflow = 'auto';
            this.logWindowDimensionLimited = true;
        }
    };

    this.getUdes = function () {
        //console.log('getUdes');
        if (typeof(lpMTagConfig)!='undefined') {
            this.ude.page = lpMTagConfig.pageVar;
            this.ude.session = lpMTagConfig.sessionVar;
            this.ude.visitor = lpMTagConfig.visitorVar;
        }
    };

    this.showUdes = function () {
        //console.log('showUdes');
        if (this.logShown) {
            this.toggleLog();
        }
        if (this.toolsShown) {
            this.toggleTools();
        }

        var html = '<b>Page UDEs</b><br />';
        html += this.objectToString(this.ude.page, undefined, true, 'LEIGeneralInfo', false);
        html += '<br /><b>Session UDEs</b>';
        html += this.objectToString(this.ude.session, undefined, true, 'LEIGeneralInfo', false);
        html += '<br /><b>Visitor UDEs</b>';
        html += this.objectToString(this.ude.visitor, undefined, true, 'LEIGeneralInfo', false);

        this.showMsgWindow(false, 'UDEs at page start', html,{width: 400, height: this.maxLogWindowMaxHeight});
        return false;
    };

    this.DisplayArray = function (data, source) {
        //console.log('DisplayArray');
        for (var i=0; i<data.length; i++) {
            var d = data[i].split('<!!>');
            this.Display(d[0], d[1], source);
        }
    };

    this.GetPageWidth = function() {
        //console.log('GetPageWidth');
        if (document.documentElement && document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        }
        else if (document.body) {
            return document.body.clientWidth;
        }
        else {
            return window.innerWidth;
        }
    };

    this.SetCookie = function( name, value, expires, path, domain, secure ) {
        //console.log('SetCookie');
        // set time, it's in milliseconds
        var today = new Date();

        /*
        if the expires variable is set, make the correct
        expires time, the current script below will set
        it for x number of days, to make it for hours,
        delete * 24, for minutes, delete * 60 * 24
        */
        var expires_date = today.getTime();
        if ( typeof(expires)=='undefined' || expires == null ) {
            expires = expires * 1000 * 60 * 60 * 24;
            expires_date = today.getTime() + (expires);
        }

        document.cookie = name + '=' +escape( value ) +
            ( ( expires ) ? ';expires=' + expires_date.toGMTString() : '' ) +
            ( ( path ) ? ';path=' + path : '' ) +
            ( ( domain ) ? ';domain=' + domain : '' ) +
            ( ( secure ) ? ';secure' : '' );
    };

    this.DeleteCookie = function ( name, path, domain ) {
        //console.log('DeleteCookie');
        if ( this.GetCookie( name ) ) {
            document.cookie = name + "=" +
                ( ( path ) ? ';path=' + path : '') +
                ( ( domain ) ? ';domain=' + domain : '' ) +
                ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
        }
    };

    this.GetCookie = function( name ) {
        //console.log('GetCookie');
        var start = document.cookie.indexOf( name + '=' );
        var len = start + name.length + 1;
        if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
            return null;
        }
        if ( start == -1 ) {
            return null;
        }
        var end = document.cookie.indexOf( ';', len );
        if ( end == -1 ) {
            end = document.cookie.length;
        }
        return unescape( document.cookie.substring( len, end ) );
    };
    //////////////////////////////////////////////////////////////////////////////////////
    this.start = function () {
        //console.log('start');
        var that = this;

        // make sure that the zIndex is the highest on page
        // if ((typeof(lpMTagConfig)=='undefined' || typeof(lpMTagConfig.emtDebugZindex)=='undefined')) {
        //     this.zindex = this.getMaxZindex()+1;
        // }

        this.getUdes();
        this.browser = this.BrowserSniff();
        this.addCss();
        this.generateHTML();
        this.createGenericDiv('LEImainDiv', this.zindex, this.posX, this.posY, null, null,this.emtHtml, null, null, 0);

        if (typeof(lpMTagConfig)!='undefined' && typeof(lpMTagConfig.emtDebugPosRight)!='undefined' && lpMTagConfig.emtDebugPosRight) {
            this.posX = this.GetPageWidth() - this.GetObj('LEImainDiv').clientWidth-30;
        }
        //this.posX = this.GetPageWidth() - this.GetObj('mainDiv').clientWidth - 120;
        //if (this.posX<10) this.posX = 10;
        this.GetObj('LEImainDiv').style.left = this.posX + 'px';
        this.showObj('LEImainDiv', false);

        this.attachEvents();
        if (typeof(lpMTagConfig)!='undefined' && typeof(lpMTagConfig.emtDebugSuperMiniMode)!='undefined' && lpMTagConfig.emtDebugSuperMiniMode) {
            this.minimizeAll();
        }
        this.timerRef = setTimeout(function() {that.updateConfig();},500);
    };
}


var lpMTagDebug = new LEI();
lpMTagDebug.start();
