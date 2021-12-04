function list_back(button_count)
{
    var list_order_num = document.getElementById("list_order").dataset.list_num;
    if(list_order_num > 0)
    {
        //현재 리스트 페이지 1 감소
        document.getElementById("list_page_text").setAttribute("data-current_list_page", parseInt(document.getElementById("list_page_text").dataset.current_list_page) - 1);

        document.getElementById("list_order").setAttribute("data-list_num", (parseInt(list_order_num) - 1) + "");

        var list_order_num = document.getElementById("list_order").dataset.list_num;

        for(var i=1;i<=button_count;i++)
        {
            document.getElementById("statistical_button_" + i).dataset.statistical_button_num = (parseInt(document.getElementById("statistical_button_" + i).dataset.statistical_button_num) - button_count) + "";
        }
        //console.log(document.getElementById("list_order").dataset.list_num);

        var statistical_button_num = parseInt(document.getElementById("list_order").dataset.list_num)*8;
        
        address_parse_button_init(button_count, statistical_button_num);
    }
}

function list_next(button_count)
{
    var list_order_num = document.getElementById("list_order").dataset.list_num;
    
    //리스트의 전체 크기를 지정해야 함 
    if(parseInt(list_order_num) < 17)
    {
        //현재 리스트 페이지 1 증가
        document.getElementById("list_page_text").setAttribute("data-current_list_page", parseInt(document.getElementById("list_page_text").dataset.current_list_page) + 1);

        document.getElementById("list_order").setAttribute("data-list_num", (parseInt(list_order_num) + 1) + "");
    
        var list_order_num = document.getElementById("list_order").dataset.list_num;

        for(var i=1;i<=button_count;i++)
        {
            document.getElementById("statistical_button_" + i).dataset.statistical_button_num = (parseInt(document.getElementById("statistical_button_" + i).dataset.statistical_button_num) + button_count) + "";
        }
        //console.log(document.getElementById("list_order").dataset.list_num);

        var statistical_button_num = parseInt(document.getElementById("list_order").dataset.list_num)*8;
        
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

            //리스트 버튼 옆에 전체 페이지 번호 저장  
            document.getElementById("list_page_text").setAttribute("data-list_page_max", parseInt(name.length/8));
            //console.log(name.length);

            if(document.getElementById("list_page_text").dataset.current_list_page <= 0)
            {
                document.getElementById("list_page_text").setAttribute("data-current_list_page", 1);
            }

            //리스트 페이지 번호 출력 
            document.getElementById("list_page_text").innerText = document.getElementById("list_page_text").dataset.current_list_page + " / " + document.getElementById("list_page_text").dataset.list_page_max;

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

                    document.getElementById("statistical_button_data_" + i).setAttribute("data-statistical_button_name", xml_name);
                    document.getElementById("statistical_button_data_" + i).setAttribute("data-statistical_button_dsd_url", xml_dsd_url);
                    document.getElementById("statistical_button_data_" + i).setAttribute("data-statistical_button_structure_specific_url", xml_structure_specific_url);

                    //console.log(document.getElementById("statistical_button_data_" + i).dataset.statistical_button_name);
                    //console.log(document.getElementById("statistical_button_data_" + i).dataset.statistical_button_dsd_url);
                    //console.log(document.getElementById("statistical_button_data_" + i).dataset.statistical_button_structure_specific_url);
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

//여러 단위를 저장하기 위한 배열 
var unit_list_id = [], unit_list_name = [];

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
            var concept_list = xml.getElementsByTagName("structure:Concept");

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
            
            //부제목 버튼 번호 
            var subtitle_button_num = 0;

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

                            //부제목 버튼 속성 변경 
                            subtitle_button_num++;
                            subtitle_button.setAttribute("id", "subtitle_button_" + subtitle_button_num);
                            subtitle_button.setAttribute("data-subtitle_item_id_num", code_id);
                            subtitle_button.setAttribute("data-title_button_num", button_num);
                            subtitle_button.setAttribute("data-subtitle_button_num", subtitle_button_num);
                            subtitle_button.setAttribute("onClick", "get_statistical_data(" + subtitle_button_num + ")");
                        }
                    }
                }
                //지역 이름별 아이디 구하기
                if(code_list[i].childNodes[0].textContent == "행정구역별")
                {
                    for(var j=0;j<code_list[i].childNodes.length;j++)
                    {
                        for(var k=0;k<code_list[i].childNodes[j].childNodes.length;k++)
                        {
                            //console.log(code_list[i].childNodes[j].getAttribute("id"));
                            //console.log(code_list[i].childNodes[j].childNodes[k].textContent);

                            if(code_list[i].childNodes[j].childNodes[k].textContent.indexOf("전국(평균)") > -1)
                            {
                                document.getElementById("local_name_id").setAttribute("data-nation_name_id", code_list[i].childNodes[j].getAttribute("id"))
                            }
                            else if(code_list[i].childNodes[j].childNodes[k].textContent.indexOf("서울특별시") > -1)
                            {
                                document.getElementById("local_name_id").setAttribute("data-seoul_name_id", code_list[i].childNodes[j].getAttribute("id"))
                            }
                            else if(code_list[i].childNodes[j].childNodes[k].textContent.indexOf("부산광역시") > -1)
                            {
                                document.getElementById("local_name_id").setAttribute("data-busan_name_id", code_list[i].childNodes[j].getAttribute("id"))
                            }
                            else if(code_list[i].childNodes[j].childNodes[k].textContent.indexOf("대구광역시") > -1)
                            {
                                document.getElementById("local_name_id").setAttribute("data-daegu_name_id", code_list[i].childNodes[j].getAttribute("id"))
                            }
                            else if(code_list[i].childNodes[j].childNodes[k].textContent.indexOf("인천광역시") > -1)
                            {
                                document.getElementById("local_name_id").setAttribute("data-incheon_name_id", code_list[i].childNodes[j].getAttribute("id"))
                            }
                            else if(code_list[i].childNodes[j].childNodes[k].textContent.indexOf("광주광역시") > -1)
                            {
                                document.getElementById("local_name_id").setAttribute("data-gwangju_name_id", code_list[i].childNodes[j].getAttribute("id"))
                            }
                            else if(code_list[i].childNodes[j].childNodes[k].textContent.indexOf("대전광역시") > -1)
                            {
                                document.getElementById("local_name_id").setAttribute("data-daejeon_name_id", code_list[i].childNodes[j].getAttribute("id"))
                            }
                            else if(code_list[i].childNodes[j].childNodes[k].textContent.indexOf("울산광역시") > -1)
                            {
                                document.getElementById("local_name_id").setAttribute("data-ulsan_name_id", code_list[i].childNodes[j].getAttribute("id"))
                            }
                            else if(code_list[i].childNodes[j].childNodes[k].textContent.indexOf("세종특별자치시") > -1)
                            {
                                document.getElementById("local_name_id").setAttribute("data-sejong_name_id", code_list[i].childNodes[j].getAttribute("id"))
                            }
                        }
                        //console.log("--");
                    }
                }
                else if(code_list[i].childNodes[0].textContent == "단위")
                {
                    //배열 비우기
                    unit_list_id = [];
                    unit_list_name = [];

                    //unit_list_id = [], unit_list_name = [];
                    for(var j=0;j<code_list[i].childNodes.length;j++)
                    {
                        for(var k=0;k<code_list[i].childNodes[j].childNodes.length;k++)
                        {
                            //console.log(code_list[i].childNodes[j].getAttribute("id"));
                            //console.log(code_list[i].childNodes[j].childNodes[k].textContent);
                            
                            if((code_list[i].childNodes[j].tagName == "structure:Code") && ((code_list[i].childNodes[j].childNodes[k].tagName == "common:Name")) && (code_list[i].childNodes[j].childNodes[k].textContent != null))
                            {
                                unit_list_id.push(code_list[i].childNodes[j].getAttribute("id"));
                                unit_list_name.push(code_list[i].childNodes[j].childNodes[k].textContent);
                            }
                        }
                        //console.log("--");
                    }
                }
            }

            /*
            for(var i=0;i<unit_list_id.length;i++)
            {
                console.log("id: " + unit_list_id[i] + " / name: " + unit_list_name[i]);
            }
            */

            //지역, 단위 아이템 id 이름 구하기(C_A, C_B, C_C...)
            for(var i=0;i<concept_list.length;i++)
            {
                //console.log(concept_list[i].getAttribute("id"));
                //console.log(concept_list[i].childNodes[0].textContent);
                if(concept_list[i].childNodes[0].textContent == "행정구역별")
                {
                    document.getElementById("statistical_data").setAttribute("data-local_id_name", concept_list[i].getAttribute("id"));
                    continue;
                }
                else if(concept_list[i].childNodes[0].textContent == "단위")
                {
                    document.getElementById("peripheral_data").setAttribute("data-statistical_unit", concept_list[i].getAttribute("id"));
                    continue;
                }
            }
        }
    }
}

//xml structure_specific 데이터 
function get_statistical_data(button_num)
{
    //제목 데이터 추가 
    document.getElementById("peripheral_data").setAttribute("data-title_name", document.getElementById("statistical_button_data_" + document.getElementById("subtitle_button_" + button_num).dataset.title_button_num).dataset.statistical_button_name);
    //부제목 데이터 추가 
    document.getElementById("peripheral_data").setAttribute("data-subtitle_name", document.getElementById("subtitle_button_" + button_num).textContent);

    var xml_structure_specific_parser = new XMLHttpRequest();

    var title_button_num = document.getElementById("subtitle_button_" + button_num).dataset.title_button_num;
    //console.log("title_button_num: " + title_button_num);
    var xml_structure_specific_url_text = document.getElementById("statistical_button_data_" + title_button_num).dataset.statistical_button_structure_specific_url;

    //var dsd_url_text = "https://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=NWMyYjM4YTFiNjc1Mjk4ZWRiMjQ0NTBmNDg3NTAzOTE=&format=sdmx&jsonVD=Y&userStatsId=kjkj0581/101/DT_1YL9801/2/1/20211117214224&type=DSD&prdSe=Y&version=v2_1";

    xml_structure_specific_parser.open('GET', xml_structure_specific_url_text, true);
    xml_structure_specific_parser.send();

    var structure_specific_LOCAL, structure_specific_UNIT, structure_specific_FREQ, structure_specific_ITEM, structure_specific_OBS_VALUE;

    //console.log("xml_structure_specific_url_text: " + xml_structure_specific_url_text);

    xml_structure_specific_parser.onreadystatechange = function()
    {
        //서버가 성공적으로 연결될 때
        if((xml_structure_specific_parser.readyState == 4) && (xml_structure_specific_parser.status >= 200) && (xml_structure_specific_parser.status < 300))
        {
            var xml_structure_specific = xml_structure_specific_parser.responseXML;

            var structure_specific_series_data = xml_structure_specific.getElementsByTagName("Series");
            //var structure_specific_obs_data = xml_structure_specific.getElementsByTagName("Series").childNodes[0];

            //console.log("length: " + structure_specific_series_data.length);

            //console.log("button_num: " + button_num);
            //console.log(document.getElementById("subtitle_button_" + button_num).dataset.subtitle_item_id_num);

            //지역 데이터 값 초기화 
            document.getElementById("statistical_data").setAttribute("data-nation_data", 0);
            document.getElementById("statistical_data").setAttribute("data-seoul_data", 0);
            document.getElementById("statistical_data").setAttribute("data-busan_data", 0);
            document.getElementById("statistical_data").setAttribute("data-daegu_data", 0);
            document.getElementById("statistical_data").setAttribute("data-incheon_data", 0);
            document.getElementById("statistical_data").setAttribute("data-gwangju_data", 0);
            document.getElementById("statistical_data").setAttribute("data-daejeon_data", 0);
            document.getElementById("statistical_data").setAttribute("data-ulsan_data", 0);
            document.getElementById("statistical_data").setAttribute("data-sejong_data", 0);

            for(var i=0;i<structure_specific_series_data.length;i++)
            {
                /*
                    structure_specific에서 전국 데이터 가져오기

                    지역(ITEM) id
                    전국(평균): 00
                    서울특별시: 11
                    부산광역시: 21
                    대구광역시: 22
                    인천광역시: 23
                    광주광역시: 24
                    대전광역시: 25
                    울산광역시: 26
                    세종특별자치시: 29
                */
                //주기 번호 
                structure_specific_FREQ = structure_specific_series_data[i].getAttribute("FREQ");
                //항목 번호 
                structure_specific_ITEM = structure_specific_series_data[i].getAttribute("ITEM");
                //지역 번호 
                //console.log("local: " + document.getElementById("statistical_data").dataset.local_id_name);
                structure_specific_LOCAL = structure_specific_series_data[i].getAttribute(document.getElementById("statistical_data").dataset.local_id_name);

                //단위 번호 
                structure_specific_UNIT = structure_specific_series_data[i].getAttribute(document.getElementById("peripheral_data").dataset.statistical_unit);

                //데이터
                structure_specific_OBS_VALUE = structure_specific_series_data[i].childNodes[0].getAttribute("OBS_VALUE");
        
                //console.log("ITEM: " + structure_specific_ITEM + " / OBS_VALUE: " + structure_specific_OBS_VALUE);
                //console.log("ITEM: " + structure_specific_ITEM + " / " + document.getElementById("subtitle_button_" + button_num).dataset.subtitle_item_id_num);
                //console.log("ITEM: " + structure_specific_ITEM + " / LOCAL: " + structure_specific_LOCAL);
                
                //반복되는 단위 검사 함수 
                function unit_function()
                {
                    //단위는 하나라도 일치하면 적용됨
                    for(var j=0;j<unit_list_id.length;j++)
                    {
                        //console.log(structure_specific_UNIT + " / " + unit_list_id[j]);
                        if(structure_specific_UNIT == unit_list_id[j])
                        {
                            document.getElementById("peripheral_data").setAttribute("data-current_statistical_unit", unit_list_name[j]);
                        }
                    }
                }

                if(structure_specific_ITEM == document.getElementById("subtitle_button_" + button_num).dataset.subtitle_item_id_num)
                {
                    //if(structure_specific_LOCAL == "00")
                    if(structure_specific_LOCAL == document.getElementById("local_name_id").dataset.nation_name_id)
                    {
                        //전국(평균): 00
                        document.getElementById("statistical_data").setAttribute("data-nation_data", structure_specific_OBS_VALUE);
                        //console.log(document.getElementById("statistical_data").dataset.nation_data);
                        unit_function();
                    }
                    else if(structure_specific_LOCAL == document.getElementById("local_name_id").dataset.seoul_name_id)
                    {
                        //서울특별시: 11
                        document.getElementById("statistical_data").setAttribute("data-seoul_data", structure_specific_OBS_VALUE);
                        //console.log(document.getElementById("statistical_data").dataset.seoul_data);
                        unit_function();
                    }
                    else if(structure_specific_LOCAL == document.getElementById("local_name_id").dataset.busan_name_id)
                    {
                        //부산광역시: 21
                        document.getElementById("statistical_data").setAttribute("data-busan_data", structure_specific_OBS_VALUE);
                        //console.log(document.getElementById("statistical_data").dataset.busan_data);
                        unit_function();
                    }
                    else if(structure_specific_LOCAL == document.getElementById("local_name_id").dataset.daegu_name_id)
                    {
                        //대구광역시: 22
                        document.getElementById("statistical_data").setAttribute("data-daegu_data", structure_specific_OBS_VALUE);
                        //console.log(document.getElementById("statistical_data").dataset.daegu_data);
                        unit_function();
                    }
                    else if(structure_specific_LOCAL == document.getElementById("local_name_id").dataset.incheon_name_id)
                    {
                        //인천광역시: 23
                        document.getElementById("statistical_data").setAttribute("data-incheon_data", structure_specific_OBS_VALUE);
                        //console.log(document.getElementById("statistical_data").dataset.incheon_data);
                        unit_function();
                    }
                    else if(structure_specific_LOCAL == document.getElementById("local_name_id").dataset.gwangju_name_id)
                    {
                        //광주광역시: 24
                        document.getElementById("statistical_data").setAttribute("data-gwangju_data", structure_specific_OBS_VALUE);
                        //console.log(document.getElementById("statistical_data").dataset.gwangju_data);
                        unit_function();
                    }
                    else if(structure_specific_LOCAL == document.getElementById("local_name_id").dataset.daejeon_name_id)
                    {
                        //대전광역시: 25
                        document.getElementById("statistical_data").setAttribute("data-daejeon_data", structure_specific_OBS_VALUE);
                        //console.log(document.getElementById("statistical_data").dataset.daejeon_data);
                        unit_function();
                    }
                    else if(structure_specific_LOCAL == document.getElementById("local_name_id").dataset.ulsan_name_id)
                    {
                        //울산광역시: 26
                        document.getElementById("statistical_data").setAttribute("data-ulsan_data", structure_specific_OBS_VALUE);
                        //console.log(document.getElementById("statistical_data").dataset.ulsan_data);
                        unit_function();
                    }
                    else if(structure_specific_LOCAL == document.getElementById("local_name_id").dataset.sejong_name_id)
                    {
                        //세종특별자치시: 29
                        document.getElementById("statistical_data").setAttribute("data-sejong_data", structure_specific_OBS_VALUE);
                        //console.log(document.getElementById("statistical_data").dataset.sejong_data);
                        unit_function();
                    }
                }
            }
        }
    }
}