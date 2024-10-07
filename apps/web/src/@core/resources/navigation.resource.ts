export interface INavigation {
	path: string
	icon: string
	label: string
	children: INavigation[]
}

export const NAVIGATION: INavigation[] = [
	// {
	// 	path: '/',
	// 	icon: '/assets/svg/menu/home.svg',
	// 	label: 'Dashboard',
	// 	children: []
	// },
	{
		path: '/',
		icon: '/assets/svg/menu/product.svg',
		label: 'Products',
		children: []
	},
]
