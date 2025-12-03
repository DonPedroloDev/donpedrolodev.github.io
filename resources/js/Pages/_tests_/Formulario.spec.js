import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Formulario from "../Formulario.vue";

describe("HU1 – Formulario de Viaje", () => {
    it("marca error cuando no hay destino", async () => {
        const wrapper = mount(Formulario);

        wrapper.vm.destinoTexto = "";
        await wrapper.vm.$nextTick();

        await wrapper.find("button.save-btn").trigger("click");

        const status = wrapper.find(".status-message");
        expect(status.exists()).toBe(true);
        expect(status.text()).toBe("Destino obligatorio.");
    });

    it("muestra error cuando la fecha final es menor a la inicial", async () => {
        const wrapper = mount(Formulario);

        await wrapper
            .find('input[placeholder="Mi viaje a Costa Rica"]')
            .setValue("Viaje de prueba");

        await wrapper.find("select").setValue("Playa");

        wrapper.vm.destinoTexto = "Costa Rica";
        await wrapper.vm.$nextTick();

        const fechas = wrapper.findAll('input[type="date"]');
        await fechas[0].setValue("2025-01-10");
        await fechas[1].setValue("2025-01-05");

        await wrapper.find("button.save-btn").trigger("click");

        const status = wrapper.find(".status-message");
        expect(status.exists()).toBe(true);
        expect(status.text()).toBe("Fechas no válidas.");
    });

    it("guarda correctamente cuando todos los campos son válidos", async () => {
        const wrapper = mount(Formulario);

        await wrapper
            .find('input[placeholder="Mi viaje a Costa Rica"]')
            .setValue("Viaje completo de pruebas");

        await wrapper.find("select").setValue("Playa");

        wrapper.vm.destinoTexto = "Costa Rica";
        await wrapper.vm.$nextTick();

        const fechas = wrapper.findAll('input[type="date"]');
        await fechas[0].setValue("2025-01-10");
        await fechas[1].setValue("2025-01-15");

        await wrapper.find("button.save-btn").trigger("click");

        const status = wrapper.find(".status-message");
        expect(status.exists()).toBe(true);
        expect(status.text()).toBe("Viaje guardado con éxito.");
    });
});
