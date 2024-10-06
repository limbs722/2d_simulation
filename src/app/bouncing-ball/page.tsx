"use client";
import React, { useEffect, useRef, useState } from "react";
import { drawBall } from "../lib/draw";
import styled from "styled-components";

// 스타일 정의
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
`;

const CanvasContainer = styled.canvas`
    border: 2px solid #000;
    background-color: #fff;
`;

const Instructions = styled.p`
    font-size: 18px;
    color: #333;
`;

const INIT_Y = 50; // 공의 초기 Y 좌표
const RADIUS = 20; // 공의 반지름

const BouncingBallPage = () => {
    const canvasRef = useRef(null);
    const [isFalling, setIsFalling] = useState(false);
    const [y, setY] = useState(INIT_Y); // 공의 초기 Y 좌표
    const [lastClickTime, setLastClickTime] = useState(0); // 마지막 클릭 시간 기록
    const [clickCount, setClickCount] = useState(0); // 스페이스바 클릭 수
    const [resetTriggered, setResetTriggered] = useState(false); // 리셋 상태 트리거

    // Canvas 초기화 및 공을 그리는 함수
    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement | null;
        if (!canvas) return;
        const ctx = (canvas as HTMLCanvasElement).getContext("2d");

        // 캔버스 크기 설정
        canvas.width = 500;
        canvas.height = 500;

        // 공을 초기 위치에 그리기
        drawBall(y, RADIUS, canvas, ctx);
    }, [y]);

    // 공 낙하 애니메이션 처리
    useEffect(() => {
        if (!isFalling) return;

        function animateBall() {
            const canvas = canvasRef.current as HTMLCanvasElement | null;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (y < canvas.height - RADIUS) {
                setY((prevY) => prevY + 5); // 공의 낙하 속도
                drawBall(y, RADIUS, canvas, ctx);
            }
        }

        const animationId = requestAnimationFrame(animateBall);

        // cleanup: 애니메이션 중지
        return () => cancelAnimationFrame(animationId);
    }, [isFalling, y]);

    // 리셋 트리거 처리
    useEffect(() => {
        if (resetTriggered) {
            setY(INIT_Y); // 초기 Y 위치 설정
            setIsFalling(false); // 공 낙하 중지
            setResetTriggered(false); // 리셋 상태 초기화
        }
    }, [resetTriggered]);

    // 스페이스바 클릭 이벤트 처리
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space") {
                const currentTime = new Date().getTime(); // 현재 시간
                const timeDifference = currentTime - lastClickTime; // 현재 시간과 마지막 클릭 시간 차이 계산

                if (timeDifference < 300) {
                    setClickCount((prevCount) => prevCount + 1); // 빠르게 두 번 클릭한 경우
                } else {
                    setClickCount(1); // 새로운 클릭으로 간주
                }

                setLastClickTime(currentTime); // 마지막 클릭 시간 갱신

                if (clickCount === 1) {
                    // 더블 클릭일 경우 낙하 시작
                    setIsFalling(true);
                } else if (clickCount === 2) {
                    // 세 번 클릭일 경우 리셋 트리거 발생
                    setResetTriggered(true);
                    setClickCount(0); // 클릭 카운트 초기화
                }

                // 일정 시간 이후 클릭 카운트 초기화
                setTimeout(() => {
                    setClickCount(0);
                }, 500); // 500ms 후 클릭 카운트 초기화
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // cleanup: 이벤트 리스너 제거
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [clickCount, lastClickTime]);

    return (
        <Container>
            <CanvasContainer ref={canvasRef}></CanvasContainer>
            <Instructions>
                스페이스바를 더블 클릭하면 공이 낙하를 시작합니다.
            </Instructions>
            <Instructions>
                스페이스바를 세 번 연속으로 클릭하면 실험이 초기 상태로
                리셋됩니다.
            </Instructions>
        </Container>
    );
};

export default BouncingBallPage;
