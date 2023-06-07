import db from "../config/dbConnection.js";

export const getVisitedEvent = (uid, result) => {
    db.query("Select  visitedID, eventID, (select eventName from EventTBL where EventTBL.eventID = UserVisitedTBL.eventID) as eventName, (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, startDate, endDate,  pic, (select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum,(select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum,(select assessment from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID and UserVisitedTBL.userID = ?)as assessment from EventTBL where eventID in (SELECT eventID from UserVisitedTBL where userID = ?);",[uid, uid], (err, results) => {             
        if(err) {
            console.log(err);
            result(500, {
                msg : "오류가 발생하였습니다.",
                code : 500, 
                err
            }, null);
        } else if (!results.length){
            result(200, null, {
                msg : "방문한 이벤트가 없습니다.",
                code : 204,
                isSuccess : true
            })
        }
        else {
            result(200, null, {
                msg : "사용자가 방문한 이벤트를 불러옵니다",
                code : 200,
                isSuccess : true,
                userID : uid,
                results});
        }
    });    
}

export const getReviewDetail = (rid, result) => {
    db.query("select userID, eventID, (select eventName from EventTBL where EventTBL.eventID = UserVisitedTBL.eventID) as eventName, isPrivate, (select count(*) from ReviewLikeTBL where ReviewLikeTBL.visitedID = ?) as likeNum, star, (select content from CompanionTBL where CompanionTBL.cpID = UserVisitedTBL.companionID) as companion,pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,pic10,review from UserVisitedTBL where visitedID = ?;",[rid, rid], (err, results) => {             
        if(err) {
            console.log(err);
            result(500, {
                msg : "오류가 발생하였습니다.",
                code : 500, 
                err
            }, null);
        } else if (!results.length){
            result(200, null, {
                msg : "존재하지 않는 리뷰입니다.",
                code : 204,
                isSuccess : true
            })
        }
        else {
            result(200, null, {
                msg : "리뷰를 불러옵니다",
                code : 200,
                isSuccess : true,
                results});
        }
    });    
}

export const addVisitedEvent = (uid, eid, ass, result) => {
    db.query("select * from UserVisitedTBL where userID = ? and eventID = ?;", [uid, eid], (err, count) => {             
        if (err) {
            console.log(err);
            result(500, {
                msg : "오류가 발생하였습니다", 
                code : 500, 
                isSuccess : false,
                err}, null);
        } 
        else if(count.length > 0) {
            result(200, null,{
                msg : "이미 방문함에 담긴 이벤트이거나 존재하지 않는 사용자입니다.",
                code : 204,
                isSuccess : false
            });
        } 
        else {
            db.query("insert into UserVisitedTBL (userID, eventID, assessment) VALUES (?,?,?);",[uid, eid, ass], (err, results) => {             
                if(err) {
                    console.log(err);
                    result(500, {
                        code : 500,
                        isSuccess : false,
                        msg : "이벤트 담기를 실패하였습니다.",
                        err}, null);
                } else {
                    result(200, null, {
                        msg : "이벤트가 담겼습니다.",
                        code : 200,
                        isSuccess : true
                    });
                }
            }); 
        }
    });  
}
  

export const deleteVisitedEvent = (uid, eid, result) => {
    db.query("select * from UserVisitedTBL where userID = ? and eventID = ?;", [uid, eid], (err, count) => {             
        if (err) {
            console.log(err);
            result(500, {
                msg : "오류가 발생하였습니다", 
                code : 500, 
                isSuccess : false,
                err}, null);
        } 
        else if(count.length <= 0) {
            result(200, null,{
                msg : "담지 않은 이벤트를 담기 취소하려 하고 있거나, 존재하지 않는 사용자입니다.",
                code : 204,
                isSuccess : false
            });
        } 
        else {
            db.query("delete from UserVisitedTBL where userID = ? and eventID = ?;", [uid, eid], (err, results) => {             
                if(err) {
                    console.log(err);
                    result(500, {
                        code : 500,
                        isSuccess : false,
                        msg : "이벤트 담기 취소를 실패하였습니다.",
                        err}, null);
                } else {
                    result(200, null, {
                        msg : "이벤트 담기를 취소하였습니다.",
                        code : 200,
                        isSuccess : true
                    });
                }
            }); 
        }
    });  
}


export const getIfVisited = (uid, eid, result) => {
    db.query("select * from UserVisitedTBL where userID = ? and eventID = ?;", [uid, eid],(err, count) => {             
        if(err) {
            console.log(err);
            result(500, {
                isSuccess : false,
                msg : "오류가 발생하였습니다.",
                code : 500, 
                err
            }, null);

        } else if (!count.length){
            result(200, null, {
                isVisited : false,
                code : 200,
                isSuccess : true
            })
        }
        else {
            result(200, null, {
                isVisited : true,
                code : 200,
                isSuccess : true});
        }
    });    
}