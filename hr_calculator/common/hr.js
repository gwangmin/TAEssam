// 운동 강도 슬라이더 라벨 업데이트 함수
function updateIntensityDisplay() {
    const intensity = document.getElementById('exercise_intensity_slider').value;
    document.getElementById('intensity_display').textContent = intensity;
}

/*
최대 심박수 계산 함수(Tanaka 공식: 208 - 0.7 × 나이)
age: number
return: 최대 심박수
*/
function getHrMax(age) {
    if (!age || age <= 0) {
        return 0;
    }

    // 최대 심박수 계산 (Tanaka 공식: 208 - 0.7 × 나이)
    let hr_max = Math.round(208 - (0.7 * age));
    if (hr_max < 0) {
        hr_max = 0;
    }

    console.log('최대 심박수:', hr_max);
    return hr_max;
}

/*
최대 심박수 업데이트 함수
hr_max: 최대 심박수
*/
function updateHrMax(hr_max) {
    if (!hr_max) {
        return;
    }
    document.getElementById('hr_max_value').textContent = hr_max;
}

/*
목표 심박수 계산 함수(Karvonen 공식: (최대심박수-안정시심박수) * 운동강도 + 안정시심박수)
hr_max: 최대 심박수
hr_stable: 안정 시 심박수
exercise_intensity: 운동 강도. [0,1]
return: 목표 심박수
*/
function getHrGoal(hr_max, hr_stable, exercise_intensity) {
    if (!hr_max || !hr_stable || !exercise_intensity) {
        return 0;
    }

    // 목표 심박수 계산 (Karvonen 공식: (최대심박수-안정시심박수) * 운동강도 + 안정시심박수)
    let hr_goal = Math.round((hr_max - hr_stable) * exercise_intensity + hr_stable);
    if (hr_goal < 0) {
        hr_goal = 0;
    }

    console.log('목표 심박수:', hr_goal);
    return hr_goal;
}

/*
목표 심박수 업데이트 함수
hr_goal: 목표 심박수
*/
function updateHrGoal(hr_goal) {
    if (!hr_goal) {
        return;
    }
    document.getElementById('hr_goal_value').textContent = hr_goal;
}

function calc() {
    // 입력값 가져오기
    const age = parseFloat(document.getElementById('age_input').value);
    const hr_stable = parseFloat(document.getElementById('hr_stable_input').value);
    const exercise_intensity = parseFloat(document.getElementById('exercise_intensity_slider').value) / 100;
    console.log('나이:', age);
    console.log('안정 시 심박수:', hr_stable);
    console.log('운동 강도:', exercise_intensity);
    // 입력값이 비어있거나(NaN) 유효하지 않은 경우 처리

    // age가 유효한 값일 경우 최대 심박수 출력
    if (0 < age) {
        const hr_max = getHrMax(age);
        updateHrMax(hr_max);
        // 결과 카드로 스크롤
        document.querySelector('.result-section').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        // 안정 시 심박수도 유효한 경우 목표 심박수 출력
        if (0 < hr_stable) {
            const hr_goal = getHrGoal(hr_max, hr_stable, exercise_intensity);
            updateHrGoal(hr_goal);
        }
    } else {
        alert('나이와 안정 시 심박수를 올바르게 입력해주세요.\nPlease enter your age and resting heart rate correctly.');
    }
}

// 페이지 로드 시 초기 강도 표시 설정
document.addEventListener('DOMContentLoaded', function() {
    updateIntensityDisplay();
});

// 엔터키로도 계산 가능하도록 설정
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calc();
    }
});