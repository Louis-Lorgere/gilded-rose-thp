var {Shop, Item} = require('../src/gilded_rose.js');
// describe("Gilded Rose", function() {

//   it("should foo", function() {
//     const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
//     const items = gildedRose.updateQuality();
//     expect(items[0].name).toEqual("fixme");
//   });

// });

describe("Gilded Rose -", function(){

  it("Quality should decrease by 1 for normal items", function() {
    const gildedRose = new Shop([ new Item("foo", 10, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
  });

  it("Quality should decrease by 2 for conjured items", function() {
    const gildedRose = new Shop([ new Item("Conjured foo", 10, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });

  it("Quality should decrease by 2 for normal items after hitting peremption date", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 20), new Item("foo", -1, 20), new Item("foo", 0, 52) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
    expect(items[1].quality).toBe(18);
    expect(items[2].quality).toBe(50);
  });

  it("Quality should decrease by 4 for conjured items after hitting peremption date", function() {
    const gildedRose = new Shop([ new Item("Conjured foo", 0, 20), new Item("Conjured foo", -1, 20), new Item("Conjured foo", 0, 52) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(16);
    expect(items[1].quality).toBe(16);
    expect(items[2].quality).toBe(48);
  });

  it("Quality should increase by 1 for Backstage passe before 10 days from peremption date", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20), new Item("Backstage passes to a TAFKAL80ETC concert", 50, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
    expect(items[1].quality).toBe(21);
  });
  it("Quality should increase by 2 for Backstage passe between 10 and 6 days from peremption date", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20), new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
    expect(items[1].quality).toBe(22);
  });
  it("Quality should increase by 3 for Backstage passe between 5 and 1 days from peremption date", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20), new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
    expect(items[1].quality).toBe(23);
  });
  it("Quality should be 0 for Backstage after peremption date", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20), new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
  });
  it("Quality should increase by 1 for aged brie if below 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 20), new Item("Aged Brie", 1, 20), new Item("Aged Brie", 50, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
    expect(items[1].quality).toBe(21);
    expect(items[2].quality).toBe(21);
  });

  it("Quality should increase by 2 for aged brie if expired", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 0, 20), new Item("Aged Brie", 1, 20), new Item("Aged Brie", -1, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
    expect(items[1].quality).toBe(21);
    expect(items[2].quality).toBe(22);
  });

  it("Quality should stay the same for aged brie or Backstage passes if equal 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 0, 50), new Item("Backstage passes to a TAFKAL80ETC concert", 6, 50), new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50), new Item("Aged Brie", -1, 50) ] );
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
    expect(items[2].quality).toBe(50);
    expect(items[3].quality).toBe(50);
  });
  it("Quality should never go above 50 for aged brie or Backstage passes", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 20, 50), new Item("Backstage passes to a TAFKAL80ETC concert", 6, 49), new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48), new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50) ] );
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
    expect(items[2].quality).toBe(50);
    expect(items[3].quality).toBe(50);
  });
  it("Quality should never change for sulfura", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 20, 80), new Item("Sulfuras, Hand of Ragnaros", 0, 80), new Item("Sulfuras, Hand of Ragnaros", -5, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[1].quality).toBe(80);
    expect(items[2].quality).toBe(80);
  });

});