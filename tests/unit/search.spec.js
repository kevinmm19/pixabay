import Vue from 'vue';
import Search from "@/components/Search.vue";

describe("Search.vue", () => {
  it('sets the correct default data', () => {
    expect(typeof Search.data).toBe('function');
    const defaultData = Search.data();
    expect(defaultData.search).toBe('');
  });
  it("renders correctly", done => {
    const vm = new Vue(Search).$mount();
    vm.$nextTick(() => {
      expect(vm.$el).toMatchSnapshot();
      done();
    });
  });
  it("renders correctly after changing the search state", done => {
    const vm = new Vue(Search).$mount();
    vm.search = 'roses';
    vm.$nextTick(() => {
      expect(vm.$el).toMatchSnapshot();
      done();
    });
  });
});
