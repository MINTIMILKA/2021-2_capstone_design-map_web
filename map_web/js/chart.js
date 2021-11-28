//통계 주소 구하기 
//address_parser();
//get_address_num();

function address_parser()
{
    var xml_address_parser = new XMLHttpRequest();

    var xml_address_url = "http://34.64.176.60/test_html_1/statistical_data_api.xml";

    xml_address_parser.open('GET',xml_address_url, true);
    xml_address_parser.send();

    //통계 이름, dsd 주소, structure_specific 주소 
    var xml_name, xml_dsd_url, xml_structure_specific_url;

    /*
        [CORS 에러]
        Access to XMLHttpRequest at 에러 해결 방법 출처
        (서버에서 해결함)
        https://www.hooni.net/xe/study/102430
    */
    xml_address_parser.onreadystatechange = function()
    {
        //서버가 성공적으로 연결될 때
        if((xml_address_parser.readyState == 4) && (xml_address_parser.status >= 200) && (xml_address_parser.status < 300))
        {
            var xml = xml_address_parser.responseXML;
            var name = xml.getElementsByTagName("api");
            var dsd = xml.getElementsByTagName("data:dsd");
            var structure_specific = xml.getElementsByTagName("data:structure_specific");

            for(var i=0;i<1;i++)
            {
                //구글 클라우드 서버에서 주소 가져오기 
                xml_name = name[i].getAttribute("name");
                xml_dsd_url = dsd[i].childNodes[0].nodeValue;
                xml_structure_specific_url = structure_specific[i].childNodes[0].nodeValue;

                document.getElementById("structure_data").dataset.name = xml_name;
                document.getElementById("structure_data").dataset.dsd = xml_dsd_url;
                document.getElementById("structure_data").dataset.structure_specific = xml_structure_specific_url;

                //console.log(document.getElementById("structure_data").dataset.name);
                //console.log(document.getElementById("structure_data").dataset.dsd);
                //console.log(document.getElementById("structure_data").dataset.structure_specific);
            }
        }
    }
}

function get_address_num()
{
    var xml_address_parser = new XMLHttpRequest();
    var xml_address_url = "http://34.64.176.60/test_html_1/statistical_data_api.xml";
    xml_address_parser.open('GET',xml_address_url, true);
    xml_address_parser.send();

    //통계 이름, dsd 주소, structure_specific 주소 
    var xml_name;

    /*
        [CORS 에러]
        Access to XMLHttpRequest at 에러 해결 방법 출처
        (서버에서 해결함)
        https://www.hooni.net/xe/study/102430
    */
    xml_address_parser.onreadystatechange = function()
    {
        //서버가 성공적으로 연결될 때
        if((xml_address_parser.readyState == 4) && (xml_address_parser.status >= 200) && (xml_address_parser.status < 300))
        {
            var xml = xml_address_parser.responseXML;

            var name = xml.getElementsByTagName("api");

            //console.log("name_num: " + name.length);

            for(var i=0;i<1;i++)
            {
                //구글 클라우드 서버에서 주소 가져오기 
                //xml_name = name[i].getAttribute("name")
                //console.log(document.getElementById("structure_data").dataset.name);
                //console.log(document.getElementById("structure_data").dataset.dsd);
                //console.log(document.getElementById("structure_data").dataset.structure_specific);
            }
        }
    }
}

const context = document
.getElementById('myChart') //mychart라는 id를 가진 요소를 가져와서 context라는 객체에 저장한다라는 뜻. (getElementById는 특정 아이디의 요소 노드에 직접 접근이 가능한 메소드다, 보통 먼저 getEle.. 메서드로 캔버스 객체를 먼저 찾는다.)
.getContext('2d'); // 캔버스 그리기 영역이며 그리기 메서드를 가지는 객체이다.
const xlabels = [];
const myChart = new Chart(context, {
type: 'bar', // 차트의 형태
data: { // 차트에 들어갈 데이터
    labels: [ 
        //x 축
       "전국","서울","부산","대구","인천","광주","대전","울산","세종"
    ],
    datasets: [
        { //데이터
            label: '통계비교', //차트 제목
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

