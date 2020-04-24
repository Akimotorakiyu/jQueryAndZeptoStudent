console.log("hello world");

class Knife {
  elementList: NodeListOf<Element>;
  constructor(selectors: string) {
    this.elementList = document.querySelectorAll(selectors);
  }
  addEventListener(event: string, fun: (kitchen: Knife, event: Event) => any) {
    this.elementList.forEach(ele => {
      ele.addEventListener(event, event => {
        fun(this, event);
      });
    });
    return this.elementList;
  }
  innerHtml(html: string) {
    this.elementList.forEach(ele => {
      ele.innerHTML = html;
    });
    return this.elementList;
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
