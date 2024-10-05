"use client";
import React, { useEffect, useRef, useState } from "react";
import { drawBall, drawGround } from "../lib/draw";
import styled from "styled-components";

// 스타일 정의
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* height: 100vh; */
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
const INIT_Y = 100;

const BouncingBallPage = () => {
    const canvasRef = useRef(null);
    const [isFalling, setIsFalling] = useState(false);
    const [y, setY] = useState(50); // 공의 초기 Y 좌표
    const [lastClickTime, setLastClickTime] = useState(0); // 마지막 클릭 시간 기록
    const [clickCount, setClickCount] = useState(0); // 스페이스바 클릭 수
    const [resetTriggered, setResetTriggered] = useState(false); // 리셋 상태 트리거

    // Canvas 초기화 및 공을 그리는 함수
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const radius = 20;

        // 캔버스 크기 설정
        canvas.width = 500;
        canvas.height = 500;

        // 바닥선을 그리는 함수
        function drawGround() {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - radius); // 좌측 하단
            ctx.lineTo(canvas.width, canvas.height - radius); // 우측 하단
            ctx.strokeStyle = "#000"; // 바닥선 색상
            ctx.lineWidth = 2; // 선 두께
            ctx.stroke();
            ctx.closePath();
        }

        // 공을 그리는 함수
        function drawBall(yPosition) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 기존 공 및 바닥 지우기
            ctx.beginPath();
            ctx.arc(canvas.width / 2, yPosition, radius, 0, Math.PI * 2); // 공 그리기
            ctx.fillStyle = "#FF0000"; // 공의 색상
            ctx.fill();
            ctx.closePath();
        }

        // 공을 초기 위치에 그리기
        drawBall(y);
    }, [y]); // `y`가 변경될 때만 실행되도록 설정

    // 공 낙하 애니메이션 처리
    useEffect(() => {
        if (!isFalling) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const radius = 20;

        // 공 낙하 애니메이션
        function animateBall() {
            if (y < canvas.height - radius) {
                setY((prevY) => prevY + 5); // 공의 낙하 속도
            }
        }

        const animationId = requestAnimationFrame(animateBall);

        // cleanup: 애니메이션 중지
        return () => cancelAnimationFrame(animationId);
    }, [isFalling, y]); // `isFalling`과 `y`가 변경될 때만 실행

    // 리셋 트리거 처리
    useEffect(() => {
        if (resetTriggered) {
            setY(50); // 초기 Y 위치 설정
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
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // cleanup: 이벤트 리스너 제거
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [clickCount, lastClickTime]); // `clickCount`와 `lastClickTime`이 변경될 때만 실행

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
