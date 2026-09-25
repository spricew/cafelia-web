import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, test } from 'vitest';
import Button from '@components/Button.astro';

type Container = Awaited<ReturnType<typeof AstroContainer.create>>;

let container: Container;

beforeAll(async () => {
	container = await AstroContainer.create();
});

describe('Button', () => {
	test('renderiza un button por defecto con type="button"', async () => {
		const html = await container.renderToString(Button, { props: { label: 'Reservar' } });

		expect(html).toContain('<button');
		expect(html).toContain('type="button"');
		expect(html).toContain('Reservar');
	});

	test('renderiza un enlace cuando recibe href', async () => {
		const html = await container.renderToString(Button, {
			props: { href: '/menu', label: 'Ver menú' },
		});

		expect(html).toContain('<a');
		expect(html).toContain('href="/menu"');
		expect(html).not.toContain('<button');
	});

	test('respeta type, variant y size', async () => {
		const html = await container.renderToString(Button, {
			props: { label: 'Enviar', type: 'submit', variant: 'secondary', size: 'lg' },
		});

		expect(html).toContain('type="submit"');
		expect(html).toContain('bg-brand-caramel');
		expect(html).toContain('text-headline-sm');
	});

	test('aplica la clase class entrante', async () => {
		const html = await container.renderToString(Button, {
			props: { label: 'Reservar', class: 'w-full' },
		});

		expect(html).toContain('w-full');
	});

	test('usa aria-label explícito y si no, cae al label', async () => {
		const withAriaLabel = await container.renderToString(Button, {
			props: { label: 'Ver', 'aria-label': 'Ver la carta' },
		});
		const withFallback = await container.renderToString(Button, {
			props: { label: 'Ver la carta' },
		});

		expect(withAriaLabel).toContain('aria-label="Ver la carta"');
		expect(withFallback).toContain('aria-label="Ver la carta"');
	});

	test('mueve el icono a la derecha con iconSide="right"', async () => {
		const html = await container.renderToString(Button, {
			props: { label: 'Ir', icon: '<svg></svg>', iconSide: 'right' },
		});

		expect(html).toContain('order-2');
	});
});
