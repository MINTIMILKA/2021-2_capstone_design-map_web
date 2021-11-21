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
                //xml_name = name[i].getAttribute("name");

                //console.log(document.getElementById("structure_data").dataset.name);
                //console.log(document.getElementById("structure_data").dataset.dsd);
                //console.log(document.getElementById("structure_data").dataset.structure_specific);
            }
        }
    }
}