"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var apiClient_1 = require("../../utils/apiClient");
var apiClient = new apiClient_1.default();
var AdminCreateSingle = function (_a) {
    var roles = _a.roles, courses = _a.courses;
    var _b = react_1.useState(""), firstname = _b[0], setFirstname = _b[1];
    var _c = react_1.useState(""), lastname = _c[0], setLastname = _c[1];
    var _d = react_1.useState(""), email = _d[0], setEmail = _d[1];
    var _e = react_1.useState(""), role = _e[0], setRole = _e[1];
    var _f = react_1.useState(""), course = _f[0], setCourse = _f[1];
    var insertUser = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var body, insertResponse, alertDiv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    body = {
                        user: {
                            firstName: firstname,
                            lastName: lastname,
                            email: email,
                            roleID: role,
                        },
                        classList: {
                            courseID: course,
                        },
                    };
                    return [4 /*yield*/, apiClient.post("/auth/register", body)];
                case 1:
                    insertResponse = _a.sent();
                    alertDiv = document.getElementById("errorAlert");
                    if (insertResponse) {
                        alertDiv.classList.remove("alert-danger");
                        alertDiv.classList.add("alert-success");
                        alertDiv.innerHTML = "User Created!";
                        alertDiv.style.display = "block";
                        setTimeout(function () { return (alertDiv.style.display = "none"); }, 10000);
                    }
                    else {
                        alertDiv.classList.remove("alert-success");
                        alertDiv.classList.add("alert-danger");
                        alertDiv.innerHTML = "Failed to create User!";
                        alertDiv.style.display = "block";
                        setTimeout(function () { return (alertDiv.style.display = "none"); }, 10000);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (<react_bootstrap_1.Col xs={6} className="p-4">
      <h3 className="text-center">Create Single</h3>
      <react_bootstrap_1.Form onSubmit={insertUser} className="p-3">
        <react_bootstrap_1.Form.Group className="mb-3">
          <react_bootstrap_1.Form.Label htmlFor="firstName">First Name:</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control name="firstName" id="firstName" type="text" className="form-control mb-2" placeholder="User Firstname" value={firstname} onChange={function (e) {
            return setFirstname(e.target.value);
        }} required/>
          <react_bootstrap_1.Form.Label htmlFor="lastName">Last Name:</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control name="lastName" id="lastName" type="text" placeholder="User Lastname" value={lastname} onChange={function (e) {
            return setLastname(e.target.value);
        }} required/>
          
          <react_bootstrap_1.Form.Group className="mb-3">
            <react_bootstrap_1.Form.Label>Email:</react_bootstrap_1.Form.Label>
            <react_bootstrap_1.Form.Control type="email" placeholder="User Email" value={email} onChange={function (e) {
            return setEmail(e.target.value);
        }} autoComplete="off" required/>
          </react_bootstrap_1.Form.Group>
          <react_bootstrap_1.Form.Group className="mb-3">
            <react_bootstrap_1.Form.Label>Role:</react_bootstrap_1.Form.Label>
            <react_bootstrap_1.Form.Control type="text" placeholder="User Role" value={role} onChange={function (e) {
            return setRole(e.target.value);
        }} list="user-roles"/>
            <datalist id="user-roles">
              {roles.map(function (r) {
            return (<option key={r.id} value={r.id}>
                    {r.title}
                  </option>);
        })}
            </datalist>
          </react_bootstrap_1.Form.Group>
          <react_bootstrap_1.Form.Group className="mb-3">
            <react_bootstrap_1.Form.Label>Course:</react_bootstrap_1.Form.Label>
            <react_bootstrap_1.Form.Control type="text" placeholder="User Course" value={course} onChange={function (e) {
            return setCourse(e.target.value);
        }} list="courses"/>
            <datalist id="courses">
              {courses.map(function (c) {
            return (<option key={c.id} value={c.id}>
                    {c.title}
                  </option>);
        })}
            </datalist>
          </react_bootstrap_1.Form.Group>
          <react_bootstrap_1.Button variant="info" className="w-50 mx-auto d-block my-3" type="submit">
            Create
          </react_bootstrap_1.Button>
        </react_bootstrap_1.Form.Group>
      </react_bootstrap_1.Form>
    </react_bootstrap_1.Col>);
};
exports.default = AdminCreateSingle;
