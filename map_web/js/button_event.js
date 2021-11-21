function list_back(button_count)
{
    var list_order_num = document.getElementById("list_order").dataset.list_num;
    if(list_order_num > 0)
    {
        document.getElementById("list_order").dataset.list_num = (parseInt(list_order_num) - 1) + "";
        var list_order_num = document.getElementById("list_order").dataset.list_num;

        for(var i=1;i<=button_count;i++)
        {
            document.getElementById("statistical_button_" + i).dataset.statistical_button_num = (parseInt(document.getElementById("statistical_button_" + i).dataset.statistical_button_num) - button_count) + "";
        }
        //console.log(document.getElementById("list_order").dataset.list_num);

        var statistical_button_num = parseInt(document.getElementById("list_order").dataset.list_num)*5;
        
        address_parse_button_init(button_count, statistical_button_num);
    }
}

function list_next(button_count)
{
    var list_order_num = document.getElementById("list_order").dataset.list_num;
    
    //리스트의 전체 크기를 지정해야 함 
    if(list_order_num < 28)
    {
        document.getElementById("list_order").dataset.list_num = (parseInt(list_order_num) + 1) + "";
    
        var list_order_num = document.getElementById("list_order").dataset.list_num;

        for(var i=1;i<=button_count;i++)
        {
            document.getElementById("statistical_button_" + i).dataset.statistical_button_num = (parseInt(document.getElementById("statistical_button_" + i).dataset.statistical_button_num) + button_count) + "";
        }
        //console.log(document.getElementById("list_order").dataset.list_num);

        var statistical_button_num = parseInt(document.getElementById("list_order").dataset.list_num)*5;
        
        address_parse_button_init(button_count, statistical_button_num);
    }
}

//버튼 초기화 
function address_parse_button_init(button_count, statistical_button_num)
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

            for(var i=1;i<=button_count;i++)
            {
                if(statistical_button_num+i < name.length)
                {
                    //구글 클라우드 서버에서 주소 가져오기 
                    xml_name = name[statistical_button_num+i-1].getAttribute("name");
                    xml_dsd_url = dsd[statistical_button_num+i-1].childNodes[0].nodeValue;
                    xml_structure_specific_url = structure_specific[statistical_button_num+i-1].childNodes[0].nodeValue;

                    //버튼 텍스트 지정 
                    document.getElementById("statistical_button_" + i).innerText = xml_name;

                    document.getElementById("statistical_button_data_" + i).dataset.statistical_button_name = xml_name;
                    document.getElementById("statistical_button_data_" + i).dataset.statistical_button_dsd_url = xml_dsd_url;
                    document.getElementById("statistical_button_data_" + i).dataset.statistical_button_structure_specific_url = xml_structure_specific_url;

                    //console.log(document.getElementById("structure_data").dataset.name);
                    //console.log(document.getElementById("structure_data").dataset.dsd);
                    //console.log(document.getElementById("structure_data").dataset.structure_specific);
                }
                else
                {
                    //버튼 텍스트 지정 
                    document.getElementById("statistical_button_" + i).innerText = " * ";

                    document.getElementById("statistical_button_data_" + i).dataset.statistical_button_name = "";
                    document.getElementById("statistical_button_data_" + i).dataset.statistical_button_dsd_url = "";
                    document.getElementById("statistical_button_data_" + i).dataset.statistical_button_structure_specific_url = "";
                }
            }
        }
    }
}

//부제목 구하기 
function get_subtitle(button_num)
{
    var xml_dsd_parser = new XMLHttpRequest();

    var xml_dsd_url = document.getElementById("statistical_button_data_" + button_num).dataset.statistical_button_dsd_url;

    xml_dsd_parser.open('GET',xml_dsd_url, true);
    xml_dsd_parser.send();

    var subtitle_list = document.getElementById("subtitle_list");
    
    var code_list_id, code_id;

    /*
        [CORS 에러]
        Access to XMLHttpRequest at 에러 해결 방법 출처
        (서버에서 해결함)
        https://www.hooni.net/xe/study/102430
    */
    xml_dsd_parser.onreadystatechange = function()
    {
        //서버가 성공적으로 연결될 때
        if((xml_dsd_parser.readyState == 4) && (xml_dsd_parser.status >= 200) && (xml_dsd_parser.status < 300))
        {
            var xml = xml_dsd_parser.responseXML;

            var code_list = xml.getElementsByTagName("structure:Codelist");

            //이전 부제목 버튼 제거
            if(subtitle_list.childNodes.length > 0)
            {
                var subtitle_num = subtitle_list.childNodes.length;

                for(var i=0;i<subtitle_num;i++)
                {
                    for(var j=0;j<subtitle_list.childNodes[i].childNodes.length;j++)
                    {
                        var subtitle_button = subtitle_list.childNodes[i].childNodes[j];
                        var subtitle_button_div = subtitle_list.childNodes[i];
                        subtitle_button_div.removeChild(subtitle_button);
                    }
                }

                for(var i=0;i<subtitle_num;i++)
                {
                    //div가 줄어들면 div의 번호도 실시간으로 줄어듬 
                    subtitle_list.removeChild(subtitle_list.querySelectorAll("div")[0]);
                }
            }
            
            //부제목 리스트 구하기 
            for(var i=0;i<code_list.length;i++)
            {
                code_list_id = code_list[i].getAttribute("id");
                if(code_list_id == "CL_ITEM")
                {
                    for(var j=0;j<code_list[i].childNodes.length;j++)
                    {
                        code_id = code_list[i].childNodes[j].getAttribute("id");

                        if(code_id != null)
                        {
                            //console.log(code_list[i].childNodes[j].childNodes[0].textContent);

                            //부제목 버튼 생성 
                            var subtitle_button_div = document.createElement("div");
                            var subtitle_button = document.createElement("button");
                            var subtitle_name = document.createTextNode(code_list[i].childNodes[j].childNodes[0].textContent);
                            
                            subtitle_button.appendChild(subtitle_name);
                            subtitle_button_div.appendChild(subtitle_button);
                            subtitle_list.appendChild(subtitle_button_div);
                        }
                    }
                }
            }
        }
    }
}