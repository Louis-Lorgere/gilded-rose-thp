class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

const isBrie = function (item) {
  return item.name === "Aged Brie";
}

const isConjured = function (item) {
  return item.name.startsWith("Conjured ");
}

const isLegendary = function (item) {
  return item.name === "Sulfuras, Hand of Ragnaros";
}

const isPasses = function (item) {
  return item.name === "Backstage passes to a TAFKAL80ETC concert";
}

const increaseQuality = function(item) {
  if (item.quality < MAX_QUALITY) {
    item.quality += 1;
  }
}

const decreaseQuality = function(item) {
  if (item.quality > MIN_QUALITY) {
    item.quality -= 1;
  }
}

const decreaseSellin = function(item) {
  item.sellIn -= 1;
}

const isExpired = function(item) {
  return item.sellIn < 0;
}

const updatePasses = function(item) {
  decreaseSellin(item);
  increaseQuality(item);
  if (item.sellIn < 10) {          
    increaseQuality(item);
  }
  if (item.sellIn < 5) {
    increaseQuality(item);
  }
  if (isExpired(item)) {
    item.quality = MIN_QUALITY;
  }
}

const updateBrie = function(item) {
  decreaseSellin(item);
  increaseQuality(item);
  if (isExpired(item)) {
    increaseQuality(item);
  }
  return ;
}

const updateNormal = function(item) {
  decreaseSellin(item);
  decreaseQuality(item);

  if (isExpired(item)) {
    decreaseQuality(item); 
  }
}

const updateConjured = function(item) {
  decreaseSellin(item);
  decreaseQuality(item);
  decreaseQuality(item);

  if (isExpired(item)) {
    decreaseQuality(item); 
    decreaseQuality(item); 
  }
}

const updateItem = function (item){
  if (isLegendary(item)) {
    return ;
  }

  if (isBrie(item)) {
    return updateBrie(item);
  }

  if (isPasses(item)) {
    return updatePasses(item);
  }

  if (isConjured(item)) {
    return updateConjured(item);
  }

  return updateNormal(item);
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {

    this.items.forEach(updateItem);
    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
