"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_select_1 = require("react-select");
var enums_1 = require("../../utils/enums");
var QuizQuestionResponse = function (_a) {
    var questionId = _a.questionId, type = _a.type, options = _a.options, onUpdate = _a.onUpdate;
    var nameAttribute = "question-" + questionId;
    var selectOptions = options && options.length > 0
        ? options.map(function (option) {
            return {
                label: option.text,
                value: option.value
            };
        })
        : [];
    switch (type) {
        case enums_1.QuizQuestionType.TrueFalse:
            return (<div className="quiz-question-response form">
                    <div className="mb-3">
                        <react_bootstrap_1.Form.Check label="True" type="radio" value="true" name={nameAttribute} onChange={function (event) { return onUpdate(event.target.value); }}/>
                        <react_bootstrap_1.Form.Check label="False" type="radio" value="false" name={nameAttribute} onChange={function (event) { return onUpdate(event.target.value); }}/>
                    </div>
                </div>);
        case enums_1.QuizQuestionType.Text:
            return (<react_bootstrap_1.Form.Control type="text" placeholder="Enter your answer" name={nameAttribute} onChange={function (event) { return onUpdate(event.target.value); }}/>);
        case enums_1.QuizQuestionType.Select:
            return (<react_select_1.default closeMenuOnSelect={true} options={selectOptions} onChange={function (val) { return onUpdate(val); }}/>);
        case enums_1.QuizQuestionType.MultiSelect:
            return (<react_select_1.default closeMenuOnSelect={false} isMulti options={selectOptions} onChange={function (val) { return onUpdate(val); }}/>);
        default:
            return <></>;
    }
};
exports.default = QuizQuestionResponse;
