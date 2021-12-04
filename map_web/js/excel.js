function excel_statistic_file()
{
    // step 1. workbook 생성
    var wb = XLSX.utils.book_new();

    //데이터 생성
    var excel_data = new Array(4);

    /*
        0. 제목 
        1. 부제목 
        2. 지역 이름
        3. 데이터 
    */
    //제목 저장  
    excel_data[0] = new Array(2);
    excel_data[0][0] = "제목";
    excel_data[0][1] = document.getElementById("peripheral_data").getAttribute("data-title_name");
    
    //부제목 저장 
    excel_data[1] = new Array(2);
    excel_data[1][0] = "부제목";
    excel_data[1][1] = document.getElementById("peripheral_data").getAttribute("data-subtitle_name");
    
    //지역이름, 데이터 저장 
    excel_data[2] = new Array(10);
    excel_data[3] = new Array(10);

    for(var i=0;i<10;i++)
    {
        switch(i)
        {
            case 0:
                excel_data[2][i] = "지역";
                //단위
                excel_data[3][i] = "단위(" + document.getElementById("peripheral_data").getAttribute("data-current_statistical_unit") + ")";
                break;
            case 1:
                excel_data[2][i] = "전국";
                excel_data[3][i] = parseInt(document.getElementById("statistical_data").getAttribute("data-nation_data"));
                break;
            case 2:
                excel_data[2][i] = "서울";
                excel_data[3][i] = parseInt(document.getElementById("statistical_data").getAttribute("data-seoul_data"));
                break;
            case 3:
                excel_data[2][i] = "부산";
                excel_data[3][i] = parseInt(document.getElementById("statistical_data").getAttribute("data-busan_data"));
                break;
            case 4:
                excel_data[2][i] = "대구";
                excel_data[3][i] = parseInt(document.getElementById("statistical_data").getAttribute("data-daegu_data"));
                break;
            case 5:
                excel_data[2][i] = "인천";
                excel_data[3][i] = parseInt(document.getElementById("statistical_data").getAttribute("data-incheon_data"));
                break;
            case 6:
                excel_data[2][i] = "광주";
                excel_data[3][i] = parseInt(document.getElementById("statistical_data").getAttribute("data-gwangju_data"));
                break;
            case 7:
                excel_data[2][i] = "대전";
                excel_data[3][i] = parseInt(document.getElementById("statistical_data").getAttribute("data-daejeon_data"));
                break;
            case 8:
                excel_data[2][i] = "울산";
                excel_data[3][i] = parseInt(document.getElementById("statistical_data").getAttribute("data-ulsan_data"));
                break;
            case 9:
                excel_data[2][i] = "세종";
                excel_data[3][i] = parseInt(document.getElementById("statistical_data").getAttribute("data-sejong_data"));
                break;
            
        }
    }

    // step 2. 시트 만들기 
    var newWorksheet = XLSX.utils.aoa_to_sheet(excel_data);
    
    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
    XLSX.utils.book_append_sheet(wb, newWorksheet, "시트_이름_1");

    // step 4. 엑셀 파일 만들기 
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    // step 5. 엑셀 파일 내보내기 
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excel_data[0][1] + "-" + document.getElementById("peripheral_data").getAttribute("data-subtitle_name") + ".xlsx");
}

function s2ab(s) 
{ 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}