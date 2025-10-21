// 카운트다운 타이머 위젯
(function() {
    // CSS 스타일 주입
    const style = document.createElement('style');
    style.textContent = `
        .countdown-widget {
            font-family: 'Malgun Gothic', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 50px 40px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        }

        .countdown-widget-title {
            color: white;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 40px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .countdown-widget-display {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-bottom: 40px;
            flex-wrap: wrap;
        }

        .countdown-widget-box {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(5px);
            border-radius: 10px;
            padding: 20px;
            min-width: 70px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .countdown-widget-number {
            color: white;
            font-size: 48px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            line-height: 1;
        }

        .countdown-widget-separator {
            color: white;
            font-size: 48px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .countdown-widget-message {
            color: white;
            font-size: 18px;
            font-weight: 500;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }

        .countdown-widget-completed {
            font-size: 32px;
            color: #ffd700;
            animation: countdown-pulse 1.5s ease-in-out infinite;
        }

        @keyframes countdown-pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);

    // 설정 확인
    if (typeof COUNTDOWN_QUANTITY === 'undefined' || typeof COUNTDOWN_DEADLINE === 'undefined') {
        console.error('카운트다운 설정이 필요합니다. COUNTDOWN_QUANTITY와 COUNTDOWN_DEADLINE 변수를 설정해주세요.');
        return;
    }

    // HTML 구조 생성
    const container = document.getElementById('countdown-container');
    if (!container) {
        console.error('countdown-container 요소를 찾을 수 없습니다.');
        return;
    }

    container.innerHTML = `
        <div class="countdown-widget">
            <div class="countdown-widget-title">남은 선착순 할인 수량 : ${COUNTDOWN_QUANTITY}개</div>
            
            <div class="countdown-widget-display" id="countdown-display">
                <div class="countdown-widget-box">
                    <div class="countdown-widget-number" id="countdown-hours1">0</div>
                </div>
                <div class="countdown-widget-box">
                    <div class="countdown-widget-number" id="countdown-hours2">0</div>
                </div>
                <div class="countdown-widget-separator">:</div>
                <div class="countdown-widget-box">
                    <div class="countdown-widget-number" id="countdown-minutes1">0</div>
                </div>
                <div class="countdown-widget-box">
                    <div class="countdown-widget-number" id="countdown-minutes2">0</div>
                </div>
                <div class="countdown-widget-separator">:</div>
                <div class="countdown-widget-box">
                    <div class="countdown-widget-number" id="countdown-seconds1">0</div>
                </div>
                <div class="countdown-widget-box">
                    <div class="countdown-widget-number" id="countdown-seconds2">0</div>
                </div>
            </div>

            <div class="countdown-widget-message">마감 시 "할인 전 가격"으로 올라갑니다.</div>
        </div>
    `;

    // 타이머 로직
    let timerInterval;

    function parseDeadline(deadlineStr) {
        const year = deadlineStr.substring(0, 4);
        const month = deadlineStr.substring(4, 6);
        const day = deadlineStr.substring(6, 8);
        const hour = deadlineStr.substring(9, 11);
        const minute = deadlineStr.substring(11, 13);
        
        return new Date(year, month - 1, day, hour, minute, 0).getTime();
    }

    function updateCountdown() {
        const targetTime = parseDeadline(COUNTDOWN_DEADLINE);
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown-display').innerHTML = 
                '<div class="countdown-widget-completed">⏰ 시간 종료!</div>';
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const h = String(hours).padStart(2, '0');
        const m = String(minutes).padStart(2, '0');
        const s = String(seconds).padStart(2, '0');

        document.getElementById('countdown-hours1').textContent = h[0];
        document.getElementById('countdown-hours2').textContent = h[1];
        document.getElementById('countdown-minutes1').textContent = m[0];
        document.getElementById('countdown-minutes2').textContent = m[1];
        document.getElementById('countdown-seconds1').textContent = s[0];
        document.getElementById('countdown-seconds2').textContent = s[1];
    }

    // 타이머 시작
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
})();
