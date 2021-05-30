"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var QuizQuestionResponse_1 = require("./QuizQuestionResponse");
var QuizQuestion = function (_a) {
    var questionId = _a.questionId, type = _a.type, questionText = _a.questionText, options = _a.options, onUpdate = _a.onUpdate;
    return (<react_bootstrap_1.Card>
            <react_bootstrap_1.Card.Body>
                <react_bootstrap_1.Card.Title>
                    {questionText}
                </react_bootstrap_1.Card.Title>

                <QuizQuestionResponse_1.default questionId={questionId} type={type} options={options} onUpdate={onUpdate}/>
            </react_bootstrap_1.Card.Body>
        </react_bootstrap_1.Card>);
};
exports.default = QuizQuestion;
