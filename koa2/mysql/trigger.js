var trigger = {
    delEmployByShop: `CREATE TRIGGER delEmployByDelShop AFTER DELETE ON shopList FOR EACH ROW 
    BEGIN
    DELETE FROM employ WHERE employ.belongShopId = OLD.shopUuid;
    END
    `
}
module.exports = trigger