import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // API 기본 URL

/**
 * 서버에서 문제 목록을 가져오는 함수
 * @param {string} subject - 과목명
 * @returns {Promise<Array>} 문제 목록을 반환하는 Promise
 */
export const fetchQuestions = async ({ subject }) => {
    try {
        const url = `${API_BASE_URL}/quiz/${subject}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        // 서버에서 받은 오류 메시지가 있는 경우
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error fetching questions:', error.response.data.message);
            return error.response.data.message;
        } else {
            // 메시지가 없는 경우
            console.error('Error fetching questions:', error.message);
            return '문제가 발생했습니다.';
        }
    }
};

/**
 * 사용자가 퀴즈를 제출하는 함수
 * @param {Object} data - 제출할 데이터
 * @param {string} data.quizId - 퀴즈 ID
 * @param {string} data.selectedAnswer - 선택한 답변
 * @param {string} data.userId - 사용자 ID
 * @returns {Promise<Object>} 서버 응답을 반환하는 Promise
 */
export const solveQuiz = async (data) => {
    try {
        // POST 요청을 통해 데이터를 서버에 전송
        const response = await axios.post(`${API_BASE_URL}/quiz/answer`, data);
        
        // 서버 응답 반환
        return response.data;
    } catch (error) {
        // 서버에서 받은 오류 메시지가 있는 경우
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error submitting quiz:', error.response.data.message);
            return { success: false, message: error.response.data.message };
        } else {
            // 메시지가 없는 경우
            console.error('Error submitting quiz:', error.message);
            return { success: false, message: '문제를 제출하는 데 실패했습니다.' };
        }
    }
};
