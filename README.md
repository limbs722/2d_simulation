# 공 낙하 실험 시뮬레이션

## 요구사항

> 1. 스페이스 바 더블 클릭 시 낙하
> 2. 스페이스 바 세 번 클릭 시 리셋

### 상태관리(State)

• **isFalling**: 공이 낙하 중인지 여부를 true 또는 false로 저장하는 상태. 스페이스바 더블 클릭 시 true로 설정되어 낙하가 시작되고, 리셋 시 false로 설정.
• **y**: 공의 Y 좌표. 공이 떨어질 때마다 y 값이 증가하여, 캔버스 상에서 공이 아래로 이동하게 됨.
• **lastClickTime**: 마지막으로 스페이스바가 클릭된 *시간*을 기록하는 상태. 두 번 연속 클릭인지, 세 번 클릭인지 구분하기 위해 사용.
• **clickCount**: 스페이스바 클릭 *횟수*를 저장하는 상태. 더블 클릭 및 세 번 클릭을 처리하기 위한 상태.
• **resetTriggered**: 리셋 트리거가 발생했는지 여부를 저장하는 상태. 세 번 클릭하면 true로 설정되고, 이를 감지하여 공의 위치를 리셋.

### 주요기능

• **Canvas 초기화 및 공 그리기**:

-   캔버스를 초기화하고, 공을 현재의 Y 좌표에 그리기 위해 drawBall 함수가 호출. Y 좌표가 변할 때마다 공이 다시 그려지도록 설계.

• **공 낙하 애니메이션 처리**:

-   isFalling 상태가 true일 때, requestAnimationFrame을 통해 애니메이션을 반복적으로 호출. Y 좌표가 캔버스의 바닥에 닿기 전까지 증가하며, 공이 떨어지는 애니메이션을 구현.

• **리셋 트리거 처리**:

-   resetTriggered가 true가 되면 공의 Y 좌표를 초기화하고, 공의 낙하를 중지. 이 상태는 세 번 클릭하면 설정되며, 리셋 이후 자동으로 false로 다시 설정.

• **스페이스바 입력 처리**:

-   스페이스바 입력을 감지하고, 클릭 횟수를 계산합니다. 300ms 내에 연속된 두 번의 클릭은 공이 떨어지는 트리거로 간주되며, 세 번 클릭 시 리셋 트리거 발동. 일정 시간(500ms)이 지나면 클릭 카운트를 초기화하여 새로운 클릭으로 간주.

### 핵심 로직

• **더블 클릭으로 공 낙하**:

-   스페이스바를 빠르게 두 번 클릭하면 clickCount가 1이 되고, isFalling이 true로 설정되어 공이 낙하.

• **세 번 클릭으로 리셋**:

-   스페이스바를 세 번 클릭하면 resetTriggered가 true로 설정되어 공이 초기 위치로 리셋.
