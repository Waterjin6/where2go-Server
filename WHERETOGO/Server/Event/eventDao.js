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

export async function getRecommandEventsRow(connection, sex, age) {
  
    var getRecommandEventsQuery = `
        select eventID, eventName, startDate, endDate, 
        (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum, 
        (select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum, 
        (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, pic, 
        (select count(*) from UserSavedTBL 
            where UserSavedTBL.eventID = EventTBL.eventID and UserSavedTBL.userID 
    `;
    
    if(((sex == 'w')||(sex == 'm'))&&((age >= 1)&&(age <= 6))){
        getRecommandEventsQuery += `
         in (select userID from UserTBL where sex = ?  and age = ? ) 
         ) as userTopNum from EventTBL ORDER BY userTopNum DESC; 
        `;
        const getRows = await connection.query(getRecommandEventsQuery, [sex,age]);

        return getRows[0];
    }
    else if ((sex == 'w')||(sex == 'm')){
        getRecommandEventsQuery += `
         in (select userID from UserTBL where sex = ? ) 
         ) as userTopNum from EventTBL ORDER BY userTopNum DESC; 
        `;
        const getRows = await connection.query(getRecommandEventsQuery, sex);

        return getRows[0];
    }
    else if ((age >= 1)&&(age <= 6)){
        getRecommandEventsQuery += `
         in (select userID from UserTBL where age = ? ) 
         ) as userTopNum from EventTBL ORDER BY userTopNum DESC; 
        `;
        const getRows = await connection.query(getRecommandEventsQuery, age);

        return getRows[0];
    }
    else{
        getRecommandEventsQuery += `
         ) as userTopNum from EventTBL ORDER BY userTopNum DESC; 
        `;

        const getRows = await connection.query(getRecommandEventsQuery);

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

export async function getEventUserVisitedInfoRow(connection, eid,uid) {
  
    const getEventUserInfoQuery = `
        select count(*) as visitedNum from UserVisitedTBL where userID = ? and eventID = ?; 
      `;
    const getRows = await connection.query(getEventUserInfoQuery, [eid, uid]);
    return getRows[0];
};

export async function getEventUserSavedInfoRow(connection, eid,uid) {
  
    const getEventUserInfoQuery = `
        select count(*) as savedNum from UserSavedTBL where userID = ? and eventID = ?; 
      `;
    const getRows = await connection.query(getEventUserInfoQuery, [eid, uid]);
  
    return getRows[0];
};


export async function getEventExistRow(connection, eid) {
  
    const getEventExistQuery = `
        select count(*) as isExist from EventTBL where eventID = ?; 
      `;
    const getRows = await connection.query(getEventExistQuery, eid);
  
    return getRows[0];
};