//xml 주소 

//xml dsd 데이터 
//console.log(document.getElementById("structure_data").dataset.name);
//console.log(document.getElementById("structure_data").dataset.dsd);
//console.log(document.getElementById("structure_data").dataset.structure_specific);

function dsd_parser()
{
    var xml_dsd_parser = new XMLHttpRequest();

    var dsd_url_text = document.getElementById("structure_data").dataset.dsd;

    //var dsd_url_text = "https://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=NWMyYjM4YTFiNjc1Mjk4ZWRiMjQ0NTBmNDg3NTAzOTE=&format=sdmx&jsonVD=Y&userStatsId=kjkj0581/101/DT_1YL9801/2/1/20211117214224&type=DSD&prdSe=Y&version=v2_1";

    xml_dsd_parser.open('GET', dsd_url_text, true);
    xml_dsd_parser.send();

    var dsd_data;

    var dsd_text = document.querySelector("#dsd_data");

    console.log("dsd_url_text: " + dsd_url_text);

    xml_dsd_parser.onreadystatechange = function()
    {
        //서버가 성공적으로 연결될 때
        if((xml_dsd_parser.readyState == 4) && (xml_dsd_parser.status >= 200) && (xml_dsd_parser.status < 300))
        {
            var xml_dsd = xml_dsd_parser.responseXML;

            var dsd_structure_code = xml_dsd.getElementsByTagName("common:Name");

            for(var i=0;i<10;i++)
            {
                //document.write(dsd[i].childNodes[0].nodeValue);
                //구글 클라우드 서버에서 주소 가져오기  
                dsd_data = dsd_structure_code[i].childNodes[0].nodeValue;
                
                //dsd_text.appendChild(dsd_data);
                console.log("dsd_data: " + dsd_data);
            }
        }
    }
}



