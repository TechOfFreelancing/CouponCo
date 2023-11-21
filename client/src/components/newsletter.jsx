import { BsCalendarCheck } from 'react-icons/bs'
import { HiOutlineHandRaised } from 'react-icons/hi2'
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const CustomForm = ({ status, message, onValidated }) => {
    let email;

    const submit = () =>
        email &&
        email.value.indexOf('@') > -1 &&
        onValidated({
            EMAIL: email.value,
        });

    return (
        <div className="mt-6 flex max-w-md gap-x-4">
            <input
                ref={(node) => (email = node)}
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 !text-black shadow-sm outline-none sm:text-sm sm:leading-6"
            />
            <button
                type="submit"
                onClick={submit}
                className="flex-none rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            >
                Subscribe
            </button>
            {status === 'sending' && <div style={{ color: 'blue' }}>Subscribing...</div>}
            {status === 'error' && <div style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: message }} />}
            {status === 'success' && <div style={{ color: 'green' }}>Subscribed!</div>}
        </div>
    );
};

export default function NewsLetter() {
    return (
        <div className="relative isolate overflow-hidden bg-purple-200 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Subscribe to our newsletter.</h2>
                        <p className="mt-4 text-lg leading-8 text-black">
                            Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt
                            dolore.
                        </p>
                        {/* <div className="mt-6 flex max-w-md gap-x-4">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="min-w-0 flex-auto rounded-md border-0  px-3.5 py-2 !text-black shadow-sm outline-none  sm:text-sm sm:leading-6"
                                placeholder="Enter your email"
                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                            >
                                Subscribe
                            </button>
                        </div> */}
                        <MailchimpSubscribe
                            url={import.meta.env.VITE_PUBLIC_MAILCHIMP_URL}
                            render={({ subscribe, status, message }) => (
                                <CustomForm
                                    status={status}
                                    message={message}
                                    onValidated={(formData) => subscribe(formData)}
                                />
                            )}
                        />
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <div className="rounded-md  p-2 ring-1 ring-white/10">
                                <BsCalendarCheck className="h-6 w-6 text-black" aria-hidden="true" />
                            </div>
                            <dt className="mt-4 font-semibold text-black">Weekly articles</dt>
                            <dd className="mt-2 leading-7 text-black">
                                Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.
                            </dd>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="rounded-md  p-2 ring-1 ring-white/10">
                                <HiOutlineHandRaised className="h-6 w-6 text-black" aria-hidden="true" />
                            </div>
                            <dt className="mt-4 font-semibold text-black">No spam</dt>
                            <dd className="mt-2 leading-7 text-black">
                                Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

        </div>
    )
}
