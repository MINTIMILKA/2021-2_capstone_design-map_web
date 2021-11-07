var context = document
.getElementById('myChart') //mychart라는 id를 가진 요소를 가져와서 context라는 객체에 저장한다라는 뜻. (getElementById는 특정 아이디의 요소 노드에 직접 접근이 가능한 메소드다, 보통 먼저 getEle.. 메서드로 캔버스 객체를 먼저 찾는다.)
.getContext('2d'); // 캔버스 그리기 영역이며 그리기 메서드를 가지는 객체이다.
var myChart = new Chart(context, {
type: 'bar', // 차트의 형태
data: { // 차트에 들어갈 데이터
    labels: [
        //x 축
        "전국","서울","부산","대구","인천","광주","대전","울산","세종" 
    ],
    datasets: [
        { //데이터
            label: 'test1', //차트 제목
            fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
            data: [
                21,19,25,20,23,26,25 //x축 label에 대응되는 데이터 값
            ],
            backgroundColor: [
                //색상
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                //경계선 색상
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1 //경계선 굵기
        }
    ]
},
options: {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    }
}
});