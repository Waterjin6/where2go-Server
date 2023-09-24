export async function getMainBoardListRow(connection) {
  
    const getMainBoardQuery = `
        Select mainEventID, ment, prePic, eventID from MainEventTBL;
      `;
    const getRows = await connection.query(getMainBoardQuery);
  
    return getRows[0];
};

export async function getTopListRow(connection) {
  
    const getTopListRowQuery = `
        Select  eventID, eventName, 
        (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, 
        startDate, endDate,  pic, 
        (select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as totalSavedNum,
        (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum 
        from EventTBL 
        ORDER BY totalSavedNum DESC LIMIT 5;
      `;
    const getRows = await connection.query(getTopListRowQuery);
  
    return getRows[0];
};

export async function getComPopListRow(connection, cID, fromD, toD, aCode, aDCode) {
  
    var qr = `
        Select  eventID, eventName, 
        (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, 
        startDate, endDate,  pic, 
        (select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as totalSavedNum,
        (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum,
        (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID and UserVisitedTBL.companionID = ?) as companionVisitedNum
        from EventTBL where `;

    var beforeExist = 0;

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

    qr += '  ORDER BY companionVisitedNum DESC; ';

    const getRows = await connection.query(qr, cID);
  
    return getRows[0];
};


export async function getRecommandEventsRow(connection, sex, age, fromD, toD, aCode, aDCode) {
  
    var qr = `
        select eventID, eventName, startDate, endDate, 
        (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum, 
        (select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum, 
        (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, pic, 
        (select count(*) from UserSavedTBL 
            where UserSavedTBL.eventID = EventTBL.eventID and UserSavedTBL.userID 
    `;

    var qr2 = ``;
    
    var beforeExist = 0;

    if(aCode){
        qr2 += ' areacode = ';
        qr2 += aCode;
        beforeExist = 1;
    }
    
    if(aDCode){
        if(beforeExist == 1)qr2 += ' and ';
        else beforeExist = 1;
    
        qr2 += ' sigungucode = ';
        qr2 += aDCode;
    }

    if(beforeExist == 1)qr2 += ' and ';
    else beforeExist = 1;
    
    if(!fromD) qr2 += ' endDate >= now() ';
    else {
        qr2 += ' endDate >= \'';
        qr2 += fromD;
        qr2 += '\' ';
    }

    if(toD){
        qr2 += ' and startDate <= \'';
        qr2 += toD;
        qr2 += '\' ';
    }
    
    if(((sex == 'w')||(sex == 'm'))&&((age >= 1)&&(age <= 6))){
        qr += `
         in (select userID from UserTBL where sex = ?  and age = ? ) 
         ) as userTopNum from EventTBL where ${qr2} ORDER BY userTopNum DESC; 
        `;
        const getRows = await connection.query(qr, [sex,age]);

        return getRows[0];
    }
    else if ((sex == 'w')||(sex == 'm')){
        qr += `
         in (select userID from UserTBL where sex = ? ) 
         ) as userTopNum from EventTBL where ${qr2} ORDER BY userTopNum DESC; 
        `;
        const getRows = await connection.query(qr, sex);

        return getRows[0];
    }
    else if ((age >= 1)&&(age <= 6)){
        qr += `
         in (select userID from UserTBL where age = ? ) 
         ) as userTopNum from EventTBL where ${qr2} ORDER BY userTopNum DESC; 
        `;
        const getRows = await connection.query(qr, age);

        return getRows[0];
    }
    else{
        qr += `
         ) as userTopNum from EventTBL where ${qr2} ORDER BY userTopNum DESC; 
        `;

        const getRows = await connection.query(qr);

        return getRows[0];
    }
  
};

export async function getEventInfoRow(connection, eid) {
  
    const getEventInfoQuery = `
        select eventID, eventName, startDate, 
        (select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum,
        (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum , 
        endDate, (select cName from CategoryTBL where cCode = EventTBL.kind) as kind, 
        pic, 
        (select aName from AreaCodeTBL where EventTBL.areacode = AreaCodeTBL.aCode) as aName, 
        (select aDName from AreaCodeDetailTBL where AreaCodeDetailTBL.aDCode = EventTBL.sigungucode 
            and AreaCodeDetailTBL.aCode = EventTBL.areacode)as aDName, 
        addr1 as place, addr2 as detailedPlace, mapx, mapy, mlevel, tel, homepage, overview, agelimit, 
        eventtime, eventplace, bookingplace, subevent, price 
        from EventTBL where eventID = ?; 
      `;
    const getRows = await connection.query(getEventInfoQuery, eid);
  
    return getRows[0];
};

export async function getEventExistRow(connection, eid) {
  
    const getEventExistQuery = `
        select count(*) as isExist from EventTBL where eventID = ?; 
      `;
    const getRows = await connection.query(getEventExistQuery, eid);
  
    return getRows[0];
};