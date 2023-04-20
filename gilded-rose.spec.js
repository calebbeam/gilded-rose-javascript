import { expect, describe, it } from "vitest";
import { Item, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new Item("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });

  it("increases quality of tickets by 2 if less than 11 days to sellIn", () => {
    const testItem2 = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      9,
      20
    );
    items.push(testItem2);

    updateQuality();

    expect(testItem2.quality).toBe(22);
    expect(testItem2.sellIn).toBe(8);
  });

  it("reduces quality twice as fast if sellIn is less than zero", () => {
    const testItem3 = new Item("basic", -1, 3);
    items.push(testItem3);

    updateQuality();

    expect(testItem3.quality).toBe(1);
    expect(testItem3.sellIn).toBe(-2);
  });

  it("quality is never less than zero", () => {
    const testItem4 = new Item("basic", -1, 0);
    items.push(testItem4);

    updateQuality();

    expect(testItem4.quality).toBe(0);
    expect(testItem4.sellIn).toBe(-2);
  });

  it("Aged Brie actually increases in quality the older it gets", () => {
    const testItem5 = new Item("Aged Brie", 2, 0);
    items.push(testItem5);

    updateQuality();

    expect(testItem5.quality).toBe(1);
    expect(testItem5.sellIn).toBe(1);
  });

  it("The quality of an item is never more than 50.", () => {
    const testItem5 = new Item("Aged Brie", 10, 50);
    items.push(testItem5);

    updateQuality();

    expect(testItem5.quality).toBe(50);
    expect(testItem5.sellIn).toBe(9);
  });

  it("Sulfuras, Hand of Ragnaros, being a legendary item, never has to be sold nor does it decrease in quality.", () => {
    const testItem5 = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    items.push(testItem5);

    updateQuality();

    expect(testItem5.quality).toBe(80);
    expect(testItem5.sellIn).toBe(0);
  });

  it("conjured itmes decrease by 2.", () => {
    const testItem5 = new Item("Conjured Mana Cake", 3, 6);
    items.push(testItem5);

    updateQuality();

    expect(testItem5.quality).toBe(4);
    expect(testItem5.sellIn).toBe(2);
  });
});
