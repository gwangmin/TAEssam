// 운동 강도 실시간 표시 업데이트 함수
function updateIntensityDisplay() {
    let intensity = document.getElementById('exercise_intensity').value;
    document.getElementById('intensity_value').textContent = intensity;
}

/*
최대 심박수 계산 함수
age: float.
return: hr_max
*/
function getHrMax(age) {
    if (!age || age <= 0) {
        return 0;
    }
    console.log('나이:', age);
    // 최대 심박수 계산 (Tanaka 공식: 208 - 0.7 × 나이)
    let hr_max = Math.round(208 - (0.7 * age));
    if (hr_max < 0) {
        hr_max = 0;
    }
    return hr_max;
}

// 최대 심박수 업데이트 함수
function updateHrMax() {
    const age = parseFloat(document.getElementById('age').value);
    const hr_max = getHrMax(age);
    document.getElementById('hr_max').textContent = hr_max;
}

// 목표 심박수 계산 및 업데이트 함수
function updateHrGoal() {
    // 입력값 검증
    const age = parseFloat(document.getElementById('age').value);
    const hr_stable = parseFloat(document.getElementById('hr_stable').value);
    const exercise_intensity = parseFloat(document.getElementById('exercise_intensity').value) / 100;
    // 입력값이 비어있거나 유효하지 않은 경우 처리
    if (!age || !hr_stable || age <= 0 || hr_stable <= 0) {
        alert('나이와 안정 시 심박수를 올바르게 입력해주세요.\nPlease enter your age and resting heart rate correctly.');
        return;
    }
    console.log('나이:', age);
    console.log('안정시 심박수:', hr_stable);
    console.log('운동 강도:', exercise_intensity);
    
    // 최대 심박수 계산
    const hr_max = getHrMax(age);
    // 목표 심박수 계산 (Karvonen 공식: (최대심박수-안정시심박수) * 운동강도 + 안정시심박수)
    let hr_goal = Math.round((hr_max - hr_stable) * exercise_intensity + hr_stable);
    if (hr_goal < 0) {
        hr_goal = 0;
    }
    console.log('최대 심박수:', hr_max);
    console.log('목표 심박수:', hr_goal);
    
    // 결과 표시
    document.getElementById('hr_max').textContent = hr_max;
    document.getElementById('hr_goal').textContent = hr_goal;
    
    // 결과 카드로 스크롤
    document.querySelector('.result-section').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// 페이지 로드 시 초기 강도 표시 설정
document.addEventListener('DOMContentLoaded', function() {
    updateIntensityDisplay();
});

// 엔터키로도 계산 가능하도록 설정
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        updateHrGoal();
    }
});