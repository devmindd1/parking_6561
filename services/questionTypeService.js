const QuestionTypeModel = require('../models/QuestionTypeModel');
const QuestionModel = require('../models/QuestionModel');
const QuestionsAnswerModel = require('../models/QuestionsAnswerModel');

exports.getByTypeId = async function(questionTypeId){
    const questionTypeModel = new QuestionTypeModel();
    const questionModel = new QuestionModel();
    const questionsAnswerModel = new QuestionsAnswerModel();

    const questionType = await questionTypeModel.getById(questionTypeId);
    questionType.questions = await questionModel.getByQuestionType(questionTypeId);

    for(const question of questionType.questions)
        question.answers = await questionsAnswerModel.getByQuestionId(question.id);

    return questionType
};

