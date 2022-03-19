const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe("Gilded Rose", function() {
  it("should rejuice quality by one in a day", function() {
    const gildedRose = new Shop([new Item("Quinten", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
  });

  it("should lower sell in date", () => {
    const gildedRose = new Shop([new Item("Quinten", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  })

  it("should lower quality twice as fast passed sell date", () => {
    const gildedRose = new Shop([new Item("Quinten", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  })

  it("should never be negative quality number", () => {
    const gildedRose = new Shop([new Item("Quinten", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })

  it("should never be more than 50", () => {
    const gildedRose = new Shop([new Item("Quinten", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  })

  it("Sulfuras should never decrease in quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(25);
  })
  
  it("Aged Brie should increase in quality as it gets older", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(27);
  })

  it("Backstage passes should decrease to 0 after concert ", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  })

  it("Backstage passes should increase by 3 when there are 5 days or less", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(25 + 3);
  })

  it("Backstage passes should increase by 2 when there are 10 days or less", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 28)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(28 + 2);
  })
});