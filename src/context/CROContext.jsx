import React, { createContext, useContext, useState, useEffect } from 'react';

// Cookie Utility
const CROCookie = {
    set: (name, value, days = 0) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax; Secure`;
    },
    get: (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};

const CROContext = createContext();

export const useCRO = () => useContext(CROContext);

export const CROProvider = ({ children }) => {
    const [visits, setVisits] = useState(0);
    const [funnelState, setFunnelState] = useState(null);
    const [interest, setInterest] = useState(null);
    const [consent, setConsent] = useState(false);
    const [showConsentBanner, setShowConsentBanner] = useState(false);

    useEffect(() => {
        // Initialize Consent
        const consentVal = CROCookie.get('cro_consent');
        const hasSeenConsentThisSession = sessionStorage.getItem('beauthe_consent_seen');

        if (consentVal === 'true') {
            setConsent(true);
        } else if (consentVal === 'false') {
            setConsent(false);
        } else if (!hasSeenConsentThisSession) {
            setShowConsentBanner(true);
            sessionStorage.setItem('beauthe_consent_seen', 'true');
        }


        // Initialize Visits (Welcome Message)
        let v = parseInt(CROCookie.get('cro_visit_count')) || 0;
        v++;
        CROCookie.set('cro_visit_count', v, 180);
        setVisits(v);

        // Initialize Funnel (Abandonment)
        setFunnelState(CROCookie.get('cro_funnel_state'));

        // Initialize Interest
        setInterest(CROCookie.get('cro_interest'));
    }, []);

    const acceptConsent = () => {
        CROCookie.set('cro_consent', 'true', 365);
        setConsent(true);
        setShowConsentBanner(false);
    };

    const declineConsent = () => {
        CROCookie.set('cro_consent', 'false', 365);
        setConsent(false);
        setShowConsentBanner(false);
    };

    const trackFunnelStep = (step) => {
        CROCookie.set('cro_funnel_state', step); // Session cookie (days=0)
        setFunnelState(step);
    };

    const clearFunnel = () => {
        CROCookie.set('cro_funnel_state', '', -1);
        setFunnelState(null);
    };

    const trackInterest = (categorySlug) => {
        if (consent) {
            CROCookie.set('cro_interest', categorySlug, 30);
            setInterest(categorySlug);
        }
    };

    return (
        <CROContext.Provider value={{
            visits,
            funnelState,
            interest,
            consent,
            showConsentBanner,
            acceptConsent,
            declineConsent,
            trackFunnelStep,
            clearFunnel,
            trackInterest
        }}>
            {children}
        </CROContext.Provider>
    );
};
