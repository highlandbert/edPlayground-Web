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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api.service.js":
/*!****************************!*\
  !*** ./src/api.service.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApiService; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ "./src/auth.service.js");



class ApiService {

  static get(route) {
    const auth = _auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].getCredentials();
    const token = auth.token;
    
    return fetch(`${_config__WEBPACK_IMPORTED_MODULE_0__["default"].api}/${route}`, {
      headers: {
        'x-access-token': token, 
      },
      method: 'GET'
    })
    .then(response => {
      if (response.status === 403) {
        _auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].doLogin();
      }
      else if (response.status === 404) {
        throw 'Not Found';
      } else {
        return response.json();
      }
    });
  }

  static post(route, params) {
    const auth = _auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].getCredentials();
    const token = auth.token;

    return fetch(`${_config__WEBPACK_IMPORTED_MODULE_0__["default"].api}/${route}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token,
      },
      body: params
    })
    .then(res => {
      if (res.status === 400) {
        return res.json().then(error => ({ error: error }));
      }
      return res.json()
    });
  }

  static delete(route) {
    const auth = _auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].getCredentials();
    const token = auth.token;
    
    return fetch(`${_config__WEBPACK_IMPORTED_MODULE_0__["default"].api}/${route}`, {
      headers: {
        'x-access-token': token, 
      },
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 403) {
        _auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].doLogin();
      } else {
        return response.json();
      }
    });
  }
}

/***/ }),

/***/ "./src/auth.service.js":
/*!*****************************!*\
  !*** ./src/auth.service.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AuthService; });

class AuthService {

	static getCredentials() {
		return JSON.parse(window.localStorage.getItem('auth'));
	}

	static hasCredentials() {
		return window.localStorage.getItem('auth') !== null;
	}

	static getUsername() {
		return this.hasCredentials()
			? this.getCredentials().username
			: 'Stranger';
	}

	static getUserId() {
    return this.hasCredentials()
      ? this.getCredentials()._id
      : 0;
  }

	static doLogin() {
		window.location.href = "/auth";
	}
}

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Config = {
  api: 'http://localhost:8080/api',
  cdn: 'http://localhost:8080/cdn'
};

/* harmony default export */ __webpack_exports__["default"] = (Config);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ "./src/auth.service.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.service */ "./src/api.service.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/config.js");




if (!_auth_service__WEBPACK_IMPORTED_MODULE_0__["default"].hasCredentials()) {
  _auth_service__WEBPACK_IMPORTED_MODULE_0__["default"].doLogin();
}

console.log(_auth_service__WEBPACK_IMPORTED_MODULE_0__["default"].getUsername());

document.getElementById('user').innerText = _auth_service__WEBPACK_IMPORTED_MODULE_0__["default"].getUsername();

const params = location.search.replace('?', '').split('&');

let levelId = 0; // '5aa27062a8669d1a785f511b';
let redirect = '';

for (const param of params) {
  if (param.includes('level=')) {
    levelId = param.replace('level=', '');
  }
  if (param.includes('redirect=')) {
    redirect = param.replace('redirect=', '');
  }
}

console.log(levelId);
console.log(redirect);

if (redirect !== '') {
  const links = document.getElementsByClassName('back');
  for (const link of links) {
    link.innerText = 'Return';
    link.href = redirect;
  };
}

const addScript = (id) => {
  const script = document.createElement('script');
  script.src = `${_config__WEBPACK_IMPORTED_MODULE_2__["default"].cdn}/levels/${id}`;
  document.body.appendChild(script);
};

let hasScores = false;

_api_service__WEBPACK_IMPORTED_MODULE_1__["default"].get(`levels/${levelId}`).then(level => {
  console.log(level);
  hasScores = level.hasScores;
  document.getElementById('name').innerText = level.name;
  addScript(levelId);
})
.catch(() => {
  console.log('Not Found');
  document.getElementById('e404').className = 'show';
});

playground.events.onLevelFinished = () => {
  console.log('Finished');
  const auth = _auth_service__WEBPACK_IMPORTED_MODULE_0__["default"].getCredentials();
  const userId = auth._id;

  var params = new URLSearchParams();
  params.set('levelId', levelId);
  params.set('userId', userId);
  params.set('seconds', 0);

  console.log(userId);
  document.getElementById('finished').className = 'show';
  document.getElementById('time').innerText = hasScores ? '00:00:00' : '';
  return _api_service__WEBPACK_IMPORTED_MODULE_1__["default"].post(`levelsResults`, params);
};




/***/ })

/******/ });
//# sourceMappingURL=index.js.map