import Vue from 'vue';
import Carousel from "@/components/Carousel.vue";

describe("Carousel.vue", () => {
  it('sets the correct default data', () => {
    expect(typeof Carousel.data).toBe('function');
    const defaultData = Carousel.data();
    expect(defaultData.search).toBe('');
  });
  it("renders correctly", done => {
    const vm = new Vue(Carousel).$mount();
    vm.$nextTick(() => {
      expect(vm.$el).toMatchSnapshot();
      done();
    });
  });
  it("renders correctly after changing the search state", done => {
    const vm = new Vue(Carousel).$mount();
    vm.search = 'roses';
    vm.$nextTick(() => {
      expect(vm.$el).toMatchSnapshot();
      done();
    });
  });
});
