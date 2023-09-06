export async function getSearchRow(connection, search, kind, fromD, toD, aCode, aDCode, free, align){
  
    var qr = `
        select eventID, eventName, (select cName from CategoryTBL where cCode = EventTBL.kind) as kind, 
        startDate, endDate, pic, 
        (select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum, 
        (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum 
        from EventTBL where 
    `;

    var kindExist = 0;
    var beforeExist = 0;
    var kindSet = ["A02070100","A02070200","A02080100", "A02080200", "A02080300", "A02080400", "A02080500", "A02080600", "A02080700", "A02080800", "A02080900", "A02081000", "A02081100", "A02081200", "A02081300"];

    if(aCode){
        qr += ' areacode = ';
        qr += aCode;
        beforeExist = 1;
    }

    if(aDCode){
        if(beforeExist == 1)qr += ' and ';
        else beforeExist = 1;

        qr += ' sigungucode = ';
        qr += aDCode;
    }

    if(beforeExist == 1)qr += ' and ';
    else beforeExist = 1;

    if(!fromD) qr += ' endDate >= now() ';
    else {
        qr += ' endDate >= \'';
        qr += fromD;
        qr += '\' ';
    }

    if(toD){
        qr += ' and startDate <= \'';
        qr += toD;
        qr += '\' ';
    }

    if(search) {
        if(beforeExist == 1)qr += ' and ';
        else beforeExist = 1;

        qr += ' (eventName like \'\%';
        qr += search;
        qr += '\%\' or overview like \'\%'
        qr += search;
        qr += '\%\' or addr1 like \'\%'
        qr += search;
        qr += '\%\' or addr2 like \'\%'
        qr += search;
        qr += '\%\') ';
    }

    if(free == 1){
        if(beforeExist == 1)qr += ' and ';
        else beforeExist = 1;

        qr += ' and price like \'\%무료\%\' ';
    }

    if((kind)&&(kind != "000000000000000")){
        var kindExist = 0;

        if(beforeExist == 1)qr += ' and ';
        else beforeExist = 1;

        qr += ' kind in (';

        for(const i in kind){
            if(kind[i] != '0'){ 
                if(kindExist == 1) qr += ' , ';
                else kindExist = 1;
                qr += ' \'' + kindSet[i] + '\' ';
            }
        }

        qr += ') ';
    }

    qr += ' ORDER BY ';
                        
    if(align == 'start'){
        qr += ' startDate ASC;';
    }
    else if(align == 'end'){
        qr += ' endDate ASC;';
    }
    else {
        qr+= ' savedNum DESC;';
    }

    const getRows = await connection.query(qr);
  
    return getRows[0];
};

export async function insertSearch(connection, search){
  
    const insertSearchWordQuery = `
       insert into searchTBL (word) values (?);
      `;
    const getRows = await connection.query(insertSearchWordQuery, search);
  
    return getRows[0];
};

export async function getHotWordsRow(connection){
  
    const getHotWordsQuery = `
        Select word, count(word) as count from searchTBL Group By word ORDER BY count(*) DESC LIMIT 10;
      `;
    const getRows = await connection.query(getHotWordsQuery);
  
    return getRows[0];
};