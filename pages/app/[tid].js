import { Dialog, Transition } from '@headlessui/react'
import {
	PaperAirplaneIcon,
	UserIcon,
	UsersIcon,
	XIcon
} from '@heroicons/react/outline'
import { Fragment, useState, useEffect, componentWillMount } from 'react'
import { useRouter } from 'next/router'

import { topicsRepo } from '../api/helpers/topics'

function useStickyState(defaultValue, key) {
	if (typeof window !== 'undefined') {
		const [value, setValue] = useState(() => {
			console.log(key)
			const stickyValue = window.localStorage.getItem(key)
			console.log(stickyValue)
			return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
		})
		useEffect(() => {
			window.localStorage.setItem(key, JSON.stringify(value))
		}, [key, value])
		return [value, setValue]
	}
	return [undefined, () => {}]
}

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Layout({ props }) {
	const router = useRouter()
	const { tid } = router.query
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [messages, setMessages] = useStickyState([], `messages`)
	const [curMessage, setCurMessage] = useState(String)

	const fetchData = async ({ message, reference }) => {
		const res = await fetch('http://localhost:3000/api/consensus/message/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': `thisisasecrethederakey`
			},
			body: JSON.stringify({
				message,
				reference,
				topic_id: tid,
				allow_synchronous_consensus: true
			})
		})
		const status = await res.json()

		if (status.data) {
			const date = new Date(parseInt(status.data.reference))
			status.data.reference = date.toLocaleString('en-US')

			return setMessages(arr => [{ data: status.data, message }, ...arr])
		}
		return [{}, undefined]
	}
	// console.log(topicsRepo.topics)
	const t = topicsRepo.getAll()
	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 md:hidden"
						onClose={setSidebarOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
						</Transition.Child>

						<div className="fixed inset-0 flex z-40">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute top-0 right-0 -mr-12 pt-2">
											<button
												type="button"
												className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
												onClick={() => setSidebarOpen(false)}
											>
												<span className="sr-only">Close sidebar</span>
												<XIcon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</button>
										</div>
									</Transition.Child>
									<div className="flex-shrink-0 flex items-center px-4">
										<p>Decentraslack</p>
									</div>
									<div className="mt-5 flex-1 h-0 overflow-y-auto">
										<nav className="px-2 space-y-1">
											{t?.map((item, index) => (
												<a
													key={item.name + index}
													href={item.href}
													className={classNames(
														item.current
															? 'bg-indigo-800 text-white'
															: 'text-indigo-100 hover:bg-indigo-600',
														'group flex items-center px-2 py-2 text-base font-medium rounded-md'
													)}
												>
													<UserIcon
														className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
														aria-hidden="true"
													/>
													{item.name}
												</a>
											))}
										</nav>
									</div>
								</Dialog.Panel>
							</Transition.Child>
							<div className="flex-shrink-0 w-14" aria-hidden="true">
								{/* Dummy element to force sidebar to shrink to fit close icon */}
							</div>
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
						<div className="flex items-center flex-shrink-0 px-4">
							<p className="text-white font-bold font-4xl">Decentraslack</p>
						</div>
						<div className="mt-5 flex-1 flex flex-col">
							<nav className="flex-1 px-2 pb-4 space-y-1">
								{t?.map(item => (
									<a
										key={item.name}
										href={item.href}
										className={classNames(
											item.current
												? 'bg-indigo-800 text-white'
												: 'text-indigo-100 hover:bg-indigo-600',
											'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										)}
									>
										<UserIcon
											className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
											aria-hidden="true"
										/>
										{item.name}
									</a>
								))}
								<button
									onClick={() => {
										const id = '0.0.47732851'
										setTopics(arr => [
											...arr,
											{
												name: `Private`,
												id,
												href: `/app/${id}`,
												icon: UsersIcon,
												current: tid === id
											}
										])
									}}
									type="button"
									className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full"
								>
									New Channel
								</button>
							</nav>
						</div>
					</div>
				</div>
				<div className="md:pl-64 flex flex-col flex-1">
					<main>
						<div className="py-6">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
								<h1 className="text-2xl font-semibold text-gray-900">
									Topic {tid}
								</h1>
							</div>
							<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
								{/* Replace with your content */}

								<div className="hidden pt-3 lg:col-span-2 lg:block">
									<div className="w-full h-[48rem] border-t flex items-end border-gray-300">
										<div className="pb-2">
											{messages
												?.map((message, index) => (
													<a
														key={index}
														href={message.data.explorer_url}
														className="group w-full"
													>
														<div className=" pt-2 pb-2  flex items-center">
															<span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
																<svg
																	className="group-hover:text-indigo-200 h-full w-full text-gray-300"
																	fill="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
																</svg>
															</span>

															<div className="ml-3">
																<p className=" group-hover:text-indigo-200  text-sm font-medium text-gray-700 group-hover:text-gray-900">
																	{message.message}
																</p>
																<p className="text-xs font-medium text-gray-500 group-hover:text-indigo-300">
																	{message.data.reference}
																</p>
															</div>
														</div>
													</a>
												))
												.reverse()}
										</div>
									</div>

									<div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
										<input
											name="message"
											className="shadow-sm w-full p-2 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
											value={curMessage}
											placeholder="Message"
											onChange={e => {
												setCurMessage(e.target.value)
											}}
										/>
										<button
											type="button"
											className="inline-flex ml-2 items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											onClick={event => {
												event.preventDefault()
												const ts = new Date().valueOf()
												fetchData({
													message: curMessage,
													reference: ts.toString()
												})
												setCurMessage('')
											}}
										>
											<PaperAirplaneIcon
												className="-ml-0.5 rotate-90 h-4 w-4"
												aria-hidden="true"
											/>
										</button>
									</div>
								</div>

								{/* /End replace */}
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	)
}
