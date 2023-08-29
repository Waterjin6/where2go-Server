export async function getBigContentRow (connection, areacode) {
  
    const getBigContentQuery = `
        select aName from AreaCodeTBL where aCode = ?;
      `;
    const getBigContentRows = await connection.query(getBigContentQuery, areacode);
  
    return getBigContentRows[0];
};

export async function getSmallContentRow (connection, bigarea, smallarea) {
  
    const getSmallContentQuery = `
    select aDName from AreaCodeDetailTBL where aCode = ? and aDCode = ?;
      `;
    const getSmallContentRows = await connection.query(getSmallContentQuery, [bigarea, smallarea]);
  
    return getSmallContentRows[0];
};

export async function getListContentRow (connection) {
  
    const getListContentQuery = `
    select aCode, aName from AreaCodeTBL;
      `;
    const getListContentRows = await connection.query(getListContentQuery);
  
    return getListContentRows[0];
};

export async function getDListContentRow (connection, areacode) {
  
    const getDListQuery = `
        select aDCode, aDName from AreaCodeDetailTBL where aCode = ?;
      `;
    const getDListRows = await connection.query(getDListQuery, areacode);
  
    return getDListRows[0];
};