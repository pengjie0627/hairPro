var table = {
    // 用户表
    user: `CREATE TABLE user(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        userName VARCHAR(11) UNIQUE NOT NULL,
        userPassword VARCHAR(20) NOT NULL,
        userType VARCHAR(10) NOT NULL,
        belongShopId VARCHAR(11),
        cookies VARCHAR(100)
    )`,
    // 门店表
    shopList: `CREATE TABLE shopList(
        id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user VARCHAR(50) NOT NULL,
        shopMobile VARCHAR(11) NOT NULL,
        shopUuid VARCHAR(11) UNIQUE NOT NULL,
        shopName VARCHAR(20) NOT NULL,
        shopAddress VARCHAR(50) NOT NULL,
        shopSize SMALLINT UNSIGNED,
        shopImg VARCHAR(300) NOT NULL,
        shopLevel VARCHAR(20) NOT NULL
    )`,
    // 员工表
    employ: `CREATE TABLE employ(
        id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        mobile VARCHAR(11) UNIQUE NOT NULL,
        dateTime VARCHAR(255) NOT NULL,
        belongShopId VARCHAR(11) NOT NULL,
        loginName VARCHAR(11) UNIQUE NOT NULL,
        loginPwd VARCHAR(20) NOT NULL,
        idCard VARCHAR(20) NOT NULL,
        bankCard VARCHAR(50) NOT NULL,
        img VARCHAR(500) NOT NULL,
        salary VARCHAR(20),
        introducePercent VARCHAR(10),
        remark VARCHAR(255) NOT NULL,
        loginAuth TINYINT(1) NOT NULL DEFAULT 0,
        customCheckedAuth TINYINT(1) NOT NULL DEFAULT 0,
        otherEmployCheckAuth TINYINT(1) NOT NULL DEFAULT 0,
        cookies VARCHAR(100)
    )`,
    // 客户表
    custom: `CREATE TABLE custom(
        id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        mobile VARCHAR(11) UNIQUE NOT NULL,
        remark VARCHAR(255) NOT NULL,
        hairTime VARCHAR(15) NOT NULL,
        hairImg VARCHAR(500) NOT NULL,
        vipLevel VARCHAR(50) NOT NULL,
        introduceEmployMobile VARCHAR(20),
        cutHairEmployMobile VARCHAR(20) NOT NULL,
        cutHairPrice DECIMAL(10,2) NOT NULL
    )`
}
module.exports = table