//dont touch
export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export let items = [];

items.push(new Item("+5 Dexterity Vest", 10, 20));
items.push(new Item("Aged Brie", 2, 0)); //increases quality as sellIn goes down
items.push(new Item("Elixir of the Mongoose", 5, 7));
items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80)); //no sellIn and quality always 80
items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)); //increase quality as sellIn goes down, after sellIn, quality = 0
items.push(new Item("Conjured Mana Cake", 3, 6));

// export const updateQuality = () => {
//   for (let item of items) {
//     if (
//       item.name != "Aged Brie" &&
//       item.name != "Backstage passes to a TAFKAL80ETC concert"
//     ) {
//       // normal items that arent at 0 decrease quality
//       if (item.quality > 0) {
//         if (
//           item.name != "Sulfuras, Hand of Ragnaros" &&
//           !item.name.split(" ").includes("Conjured")
//         ) {
//           item.quality = item.quality - 1;
//         }
//         if (item.name.split(" ").includes("Conjured")) {
//           //add conjured item decrease quality
//           item.quality = item.quality - 2;
//         }
//       }
//     } else {
//       if (item.quality < 50) {
//         //increment the Brie if its not max quality
//         item.quality = item.quality + 1;
//         if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
//           if (item.sellIn < 11 && item.quality < 50) {
//             //increase ticket quality by 1 if less than 11 days and not max quality yet
//             item.quality = item.quality + 1;
//           }
//           if (item.sellIn < 6 && item.quality < 50) {
//             //increase ticket quality by 3 if less than 6 days and not max quality yet
//             item.quality = item.quality + 1;
//           }
//         }
//       }
//     }
//     if (item.name != "Sulfuras, Hand of Ragnaros") {
//       item.sellIn = item.sellIn - 1;
//     }
//     if (item.sellIn < 0) {
//       if (item.name != "Aged Brie") {
//         if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
//           if (item.quality > 0) {
//             if (item.name != "Sulfuras, Hand of Ragnaros") {
//               item.quality = item.quality - 1;
//             }
//           }
//         } else {
//           item.quality = item.quality - item.quality;
//         }
//       } else {
//         if (item.quality < 50) {
//           item.quality = item.quality + 1;
//         }
//       }
//     }
//   }
// };

export const updateQuality = () => {
  for (let item of items) {
    //basic decrease checks
    if (
      item.sellIn >= 0 &&
      item.quality >= 0 &&
      item.name != "Aged Brie" &&
      item.name != "Sulfuras, Hand of Ragnaros" &&
      item.name != "Backstage passes to a TAFKAL80ETC concert" &&
      !item.name.split(" ").includes("Conjured")
    ) {
      item.quality--;
      item.sellIn--;
    }
    //concert logic
    if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn < 11 && item.quality < 50) {
        item.quality = item.quality + 2;
        item.sellIn--;
      }
      if (item.sellIn < 6 && item.quality < 50) {
        item.quality--;
      }
    }
    //conjured logic
    if (item.name.split(" ").includes("Conjured")) {
      item.quality -= 2;
      item.sellIn--;
    }
    //quality is never more than 50
    if (item.quality >= 50 && item.name != "Sulfuras, Hand of Ragnaros") {
      item.quality = 50;
      item.sellIn--;
    }
    //reduce quality twice as fast is sellIn less than zero
    if (item.sellIn < 0) {
      item.quality -= 2;
      item.sellIn--;
    }
    //quality never negative
    if (item.quality <= 0) {
      item.quality = 0;
    }
    //Aged Brie Logic
    if (item.name == "Aged Brie" && item.quality < 50) {
      item.quality++;
      item.sellIn--;
    }
  }
};
