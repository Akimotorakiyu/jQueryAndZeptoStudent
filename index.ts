console.log("hello world");

class Knife {
  elementList: Element[];
  constructor(selectors: string) {
    if (selectors) {
      this.elementList = Array.from(document.querySelectorAll(selectors));
    }
  }

  addEventListener(event: string, fun: (kitchen: Knife, event: Event) => any) {
    this.elementList.forEach(ele => {
      ele.addEventListener(event, event => {
        fun(this, event);
      });
    });
    return this;
  }

  innerHtml(html: string) {
    this.elementList.forEach(ele => {
      ele.innerHTML = html;
    });
    return this;
  }

  forEach(fn: (ele: Element, index: number, arr: Element[]) => void) {
    this.elementList.forEach(fn, this);
    return this;
  }

  map(fn: (ele: Element, index: number, arr: Element[]) => Element) {
    const newKnife = new Knife("");
    newKnife.elementList = this.elementList.map(fn, this);
    return this;
  }
  filter(fn: (ele: Element, index: number, arr: Element[]) => Boolean) {
    const newKnife = new Knife("");
    newKnife.elementList = Array.from(this.elementList).filter(fn, this);
    return newKnife;
  }
}

function knife(selectors: string) {
  return new Knife(selectors);
}

let count = 0;

knife("#count").innerHtml(`${++count}`);

knife(".b").addEventListener("click", (kitchen, e) => {
  console.log("b");
  count++;
  knife("#count").innerHtml(`${++count}`);
  console.log(kitchen, kitchen instanceof Knife, e);
});

knife("#b1").addEventListener("click", e => {
  console.log("#b1 clicked");
});

knife("#b2").addEventListener("click", e => {
  console.log("#b2 clicked");
});
