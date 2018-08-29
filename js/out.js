/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _board = __webpack_require__(/*! ./board */ \"./js/board.js\");\n\nvar _character = __webpack_require__(/*! ./character */ \"./js/character.js\");\n\nvar _battle = __webpack_require__(/*! ./battle */ \"./js/battle.js\");\n\nvar boardFields = [[\"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\"], [\"bush\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"bush\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\"], [\"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"grass\", \"grass\", \"grass\", \"bush\", \"bush\", \"bush\"], [\"bush\", \"bush\", \"grass\", \"grass\", \"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"bush\", \"bush\", \"grass\", \"bush\", \"grass\", \"bush\"], [\"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"bush\", \"bush\"], [\"bush\", \"grass\", \"bush\", \"grass\", \"bush\", \"bush\", \"bush\", \"grass\", \"bush\", \"bush\", \"bush\", \"grass\", \"bush\", \"grass\", \"bush\"], [\"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\"], [\"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\"], [\"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\"], [\"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\", \"grass\"]];\n\nvar canvas = document.getElementById(\"board\");\nvar bCtx = canvas.getContext('2d');\nvar WORLDUNIT = 64;\n\nvar red = new _character.Character(7 * WORLDUNIT, 4 * WORLDUNIT, WORLDUNIT, boardFields);\nvar board = new _board.Board(boardFields, WORLDUNIT);\nvar battle = new _battle.Battle(1, 1, bCtx);\n\nvar update = function update() {\n\n    bCtx.clearRect(0, 0, canvas.width, canvas.height);\n    bCtx.fillStyle = \"#eaecef\";\n    bCtx.fillRect(0, 0, canvas.width, canvas.height);\n    //board.generateBackground(bCtx);\n    //red.draw(bCtx);\n    bCtx.fillStyle = \"#FF0000\";\n    battle.draw(bCtx, WORLDUNIT);\n};\n\nwindow.addEventListener('keydown', function (event) {\n    event.preventDefault();\n    switch (event.which) {\n        case 37:\n            red.rotate(\"left\");\n            red.startMoving();\n            break;\n        case 39:\n            red.rotate(\"right\");\n            red.startMoving();\n            break;\n        case 38:\n            red.rotate(\"up\");\n            red.startMoving();\n            break;\n        case 40:\n            red.rotate(\"down\");\n            red.startMoving();\n            break;\n    }\n});\n\nvar gameInterval = setInterval(function () {\n    update();\n}, 33.33);\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ "./js/battle.js":
/*!**********************!*\
  !*** ./js/battle.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.Battle = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _userInterface = __webpack_require__(/*! ./userInterface */ \"./js/userInterface.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Battle = function () {\n    function Battle(player, enemyID, context) {\n        var _this = this;\n\n        _classCallCheck(this, Battle);\n\n        this.player = player;\n        this.stage = \"options\";\n        this.stages = [\"start\", \"options\"];\n        this.currentChoice = 0;\n        this.UI = new _userInterface.UserInterface(context);\n        window.addEventListener('keyup', function () {\n            event.preventDefault();\n            switch (event.which) {\n                case 37:\n                    // LEFT\n                    _this.currentChoice -= 1;\n                    if (_this.currentChoice < 0) {\n                        _this.currentChoice = 4 + _this.currentChoice;\n                    }\n                    break;\n                case 39:\n                    // RIGHT\n                    _this.currentChoice += 1;\n                    if (_this.currentChoice > 3) {\n                        _this.currentChoice = _this.currentChoice - 4;\n                    }\n                    break;\n                case 38:\n                    // UP\n                    _this.currentChoice -= 2;\n                    if (_this.currentChoice < 0) {\n                        _this.currentChoice = 4 + _this.currentChoice;\n                    }\n                    break;\n                case 40:\n                    // DOWN\n                    _this.currentChoice += 2;\n                    if (_this.currentChoice > 3) {\n                        _this.currentChoice = _this.currentChoice - 4;\n                    }\n                case 90:\n                    // Z\n                    _this.acceptChoice();\n                    break;\n            }\n        });\n        $.ajax({\n            url: \"https://pokeapi.co/api/v2/pokemon/\" + enemyID + \"/\"\n        }).done(function (result) {\n            _this.enemy = result;\n            console.log(_this.enemy);\n            _this.enemySprite = new Image();\n            _this.enemySprite.src = _this.enemy.sprites.front_default;\n        });\n        $.ajax({\n            url: \"https://pokeapi.co/api/v2/pokemon/2/\"\n        }).done(function (result) {\n            _this.friendly = result;\n            console.log(_this.enemy);\n            _this.friendlySprite = new Image();\n            _this.friendlySprite.src = _this.friendly.sprites.back_default;\n        });\n    }\n\n    _createClass(Battle, [{\n        key: \"draw\",\n        value: function draw(context, baseUnit) {\n            var battleCircleSprite = document.getElementById(\"battleCircleSprite\");\n            context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit * 6, baseUnit * 3, battleCircleSprite.width, battleCircleSprite.height);\n            context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit * 0, baseUnit * 6, battleCircleSprite.width, battleCircleSprite.height);\n            context.drawImage(this.enemySprite, 0, 0, 96, 96, baseUnit * 8, baseUnit * 0, 5 * 64, 5 * 64);\n            context.drawImage(this.friendlySprite, 0, 0, 96, 96, baseUnit * 2, baseUnit * 3, 5 * 64, 5 * 64);\n\n            // ENEMY STATS WINDOW\n            context.fillStyle = \"#FFF\";\n            context.fillRect(50, 50, 400, 120);\n            context.fillStyle = \"#000\";\n            context.font = \"40px Arial\";\n            context.fillText(this.enemy.name, 80, 100);\n            context.font = \"30px Arial\";\n            context.fillText(\"HP\", 150, 150);\n            context.fillStyle = \"#000\";\n            context.fillRect(200, 110, 200, 30);\n            context.fillStyle = \"#33cc33\";\n            context.fillRect(205, 115, 190, 20);\n\n            // FRIENDLY STATS WINDOW\n\n            context.fillStyle = \"#FFF\";\n            context.fillRect(480, 320, 400, 120);\n            context.fillStyle = \"#000\";\n            context.font = \"40px Arial\";\n            context.fillText(this.friendly.name, 510, 360);\n            context.font = \"30px Arial\";\n            context.fillText(\"HP\", 580, 420);\n            context.fillStyle = \"#000\";\n            context.fillRect(630, 400, 200, 30);\n            context.fillStyle = \"#33cc33\";\n            context.fillRect(635, 405, 190, 20);\n\n            this.UI.drawDefault();\n\n            switch (this.stage) {\n\n                case \"start\":\n                    this.UI.drawMessage(\"Wild \" + this.enemy.name + \" appeared!\");\n                    break;\n\n                case \"options\":\n                    this.UI.drawMessage(\"What will \" + this.friendly.name.toUpperCase() + \" do?\");\n                    this.UI.drawOptionsMenu(this.stage);\n                    this.UI.drawChosenOption(this.currentChoice, this.stage);\n                    break;\n                case \"options-fight\":\n                    this.UI.drawOptionsMenu(this.stage);\n                    this.UI.drawChosenOption(this.currentChoice, this.stage);\n                    break;\n            }\n        }\n    }, {\n        key: \"acceptChoice\",\n        value: function acceptChoice() {\n            switch (this.stage) {\n                case \"options\":\n                    this.acceptOptionsChoice();\n                    break;\n                case \"options-fight\":\n                    this.acceptFightChoice();\n                    break;\n            }\n        }\n    }, {\n        key: \"goBack\",\n        value: function goBack() {}\n    }, {\n        key: \"acceptOptionsChoice\",\n        value: function acceptOptionsChoice() {\n            switch (this.currentChoice) {\n                case 0:\n                    this.stage = \"options-fight\";\n                    break;\n            }\n        }\n    }]);\n\n    return Battle;\n}();\n\nexports.Battle = Battle;\n\n//# sourceURL=webpack:///./js/battle.js?");

/***/ }),

/***/ "./js/board.js":
/*!*********************!*\
  !*** ./js/board.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Board = function () {\n    function Board(boardFields, baseUnit) {\n        _classCallCheck(this, Board);\n\n        this.boardFields = boardFields;\n        this.BGSHEET = document.getElementById(\"backgroundSpritesheet\");\n        this.GRASSSHEET = document.getElementById(\"grassSpritesheet\");\n        this.WORLDUNIT = baseUnit;\n    }\n\n    _createClass(Board, [{\n        key: \"generateBackground\",\n        value: function generateBackground(context) {\n            for (var i = 0; i < this.boardFields.length; i++) {\n                for (var j = 0; j < this.boardFields[i].length; j++) {\n                    switch (this.boardFields[i][j]) {\n                        case \"grass\":\n                            context.drawImage(this.GRASSSHEET, 0, 0, 32, 32, this.WORLDUNIT * j, this.WORLDUNIT * i, 64, 64);\n                            break;\n                        case \"bush\":\n                            context.drawImage(this.BGSHEET, 64, 0, 64, 64, this.WORLDUNIT * j, this.WORLDUNIT * i, 64, 64);\n                            break;\n                        default:\n                            context.drawImage(this.GRASSSHEET, 0, 0, 32, 32, this.WORLDUNIT * j, this.WORLDUNIT * i, 64, 64);\n                            break;\n                    }\n                }\n            }\n        }\n    }]);\n\n    return Board;\n}();\n\nexports.Board = Board;\n\n//# sourceURL=webpack:///./js/board.js?");

/***/ }),

/***/ "./js/character.js":
/*!*************************!*\
  !*** ./js/character.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Character = function () {\n    function Character(positionX, positionY, baseUnit, boardFields) {\n        _classCallCheck(this, Character);\n\n        this.width = baseUnit;\n        this.height = baseUnit;\n        this.WORLDUNIT = baseUnit;\n        this.positionX = positionX;\n        this.positionY = positionY;\n        this.isMoving = false;\n        this.direction = \"down\";\n        this.spriteX = 0;\n        this.spriteY = 0;\n        this.movementSpeed = 4;\n        this.nextStep = [this.positionX, this.positionY];\n        this.animationFrame = 0;\n        this.boardFields = boardFields;\n    }\n\n    _createClass(Character, [{\n        key: \"draw\",\n        value: function draw(context) {\n            var CHARSHEET = document.getElementById(\"characterSpritesheet\");\n            this.animationFrame++;\n            if (this.isMoving) {\n                this.move();\n            }\n            context.drawImage(CHARSHEET, this.spriteX, this.spriteY, this.width, this.width, this.positionX, this.positionY, this.width, this.height);\n        }\n    }, {\n        key: \"rotate\",\n        value: function rotate(newDirection) {\n            if (!this.isMoving) {\n                this.direction = newDirection;\n                switch (this.direction) {\n                    case \"down\":\n                        this.spriteY = 0 * this.width;\n                        break;\n                    case \"left\":\n                        this.spriteY = 1 * this.width;\n                        break;\n                    case \"right\":\n                        this.spriteY = 2 * this.width;\n                        break;\n                    case \"up\":\n                        this.spriteY = 3 * this.width;\n                        break;\n                }\n            }\n        }\n    }, {\n        key: \"startMoving\",\n        value: function startMoving() {\n            if (!this.isMoving) {\n                this.isMoving = true;\n                switch (this.direction) {\n                    case \"down\":\n                        this.nextStep[1] += this.height;\n                        break;\n                    case \"left\":\n                        this.nextStep[0] -= this.width;\n                        break;\n                    case \"right\":\n                        this.nextStep[0] += this.width;\n                        break;\n                    case \"up\":\n                        this.nextStep[1] -= this.height;\n                        break;\n                }\n            }\n        }\n    }, {\n        key: \"move\",\n        value: function move() {\n            switch (this.direction) {\n                case \"down\":\n                    this.positionY += this.movementSpeed;\n                    break;\n                case \"left\":\n                    this.positionX -= this.movementSpeed;\n                    break;\n                case \"right\":\n                    this.positionX += this.movementSpeed;\n                    break;\n                case \"up\":\n                    this.positionY -= this.movementSpeed;\n                    break;\n            }\n            if (this.positionX == this.nextStep[0] && this.positionY == this.nextStep[1]) {\n                this.isMoving = false;\n                console.log(\"Stepped on: \", this.boardFields[this.positionY / this.WORLDUNIT][this.positionX / this.WORLDUNIT]);\n                localStorage.setItem(\"positionX\", this.positionX);\n                localStorage.setItem(\"positionY\", this.positionY);\n                localStorage.setItem(\"direction\", this.direction);\n            }\n        }\n    }]);\n\n    return Character;\n}();\n\nexports.Character = Character;\n\n//# sourceURL=webpack:///./js/character.js?");

/***/ }),

/***/ "./js/userInterface.js":
/*!*****************************!*\
  !*** ./js/userInterface.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar UserInterface = function () {\n    function UserInterface(context) {\n        _classCallCheck(this, UserInterface);\n\n        this.context = context;\n        this.menuOptions = [{ text: \"FIGHT\", left: 550, top: 510 }, { text: \"BAG\", left: 820, top: 510 }, { text: \"POKeMON\", left: 550, top: 600 }, { text: \"RUN\", left: 820, top: 600 }];\n        this.fightOptions = [{ text: \"MOVE1\", left: 70, top: 510 }, { text: \"MOVE2\", left: 400, top: 510 }, { text: \"MOVE3\", left: 70, top: 600 }, { text: \"MOVE4\", left: 400, top: 600 }];\n    }\n\n    _createClass(UserInterface, [{\n        key: \"drawDefault\",\n        value: function drawDefault() {\n            this.context.fillStyle = \"#3a4e70\";\n            this.context.fillRect(0, 440, 960, 200);\n            this.context.fillStyle = \"#FFF\";\n            this.context.font = \"40px Arial\";\n        }\n    }, {\n        key: \"drawMessage\",\n        value: function drawMessage(string) {\n            console.log(string);\n            if (string.length > 25) {\n                var cutIndex = string.indexOf(\" \", 20);\n                this.context.fillText(string.substr(0, cutIndex), 20, 510);\n                this.context.fillText(string.substr(cutIndex + 1, string.length - 1), 20, 600);\n            } else {\n                this.context.fillText(string, 20, 510);\n            }\n        }\n    }, {\n        key: \"drawOptionsMenu\",\n        value: function drawOptionsMenu(stage) {\n            var optionsArray = void 0;\n            switch (stage) {\n                case \"options\":\n                    optionsArray = this.menuOptions;\n                    this.context.fillStyle = \"#000\";\n                    this.context.fillRect(480, 440, 480, 200);\n                    this.context.fillStyle = \"#FFF\";\n                    this.context.fillRect(490, 450, 460, 180);\n                    break;\n                case \"options-fight\":\n                    optionsArray = this.fightOptions;\n                    this.context.fillStyle = \"#000\";\n                    this.context.fillRect(0, 440, 580, 200);\n                    this.context.fillStyle = \"#FFF\";\n                    this.context.fillRect(10, 450, 560, 180);\n                    this.context.fillStyle = \"#000\";\n                    break;\n            }\n\n            this.context.fillStyle = \"#000\";\n            this.context.fillText(optionsArray[0].text, optionsArray[0].left, optionsArray[0].top);\n            this.context.fillText(optionsArray[1].text, optionsArray[1].left, optionsArray[1].top);\n            this.context.fillText(optionsArray[2].text, optionsArray[2].left, optionsArray[2].top);\n            this.context.fillText(optionsArray[3].text, optionsArray[3].left, optionsArray[3].top);\n        }\n    }, {\n        key: \"drawChosenOption\",\n        value: function drawChosenOption(number, stage) {\n            var optionsArray = void 0;\n            switch (stage) {\n                case \"options\":\n                    optionsArray = this.menuOptions;\n                    break;\n                case \"options-fight\":\n                    optionsArray = this.fightOptions;\n                    break;\n            }\n            this.context.fillRect(optionsArray[number].left - 40, optionsArray[number].top - 25, 20, 20);\n        }\n    }]);\n\n    return UserInterface;\n}();\n\nexports.UserInterface = UserInterface;\n\n//# sourceURL=webpack:///./js/userInterface.js?");

/***/ })

/******/ });