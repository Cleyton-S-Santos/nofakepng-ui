
export const RYBBIT_SITE_ID = "43dda020c290";
declare global {
  interface Window {
    rybbit?: {
      pageview: () => void;
      event: (name: string, properties?: Record<string, any>) => void;
      identify: (userId: string) => void;
      clearUserId: () => void;
      getUserId: () => string | null;
    };
  }
}

/**
 * Inicializa o Rybbit na aplicação
 */
export const initRybbit = (): void => {
  console.log('🚀 Inicializando Rybbit');
  
  if (document.querySelector(`script[data-site-id="${RYBBIT_SITE_ID}"]`)) {
    console.log('✅ Rybbit já está inicializado');
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://app.rybbit.io/api/script.js';
  script.async = true;
  script.setAttribute('data-site-id', RYBBIT_SITE_ID);
  
  script.onload = () => {
    setTimeout(() => {
      if (window.rybbit) {
        console.log('🎉 Rybbit carregado e disponível!');
        console.log('📊 Endpoint do script:', script.src);
        console.log('🆔 Site ID:', script.getAttribute('data-site-id'));
      } else {
        console.warn('⚠️ Script carregado mas window.rybbit não está disponível');
      }
    }, 100);
  };
  
  script.onerror = () => {
    console.error('❌ Erro ao carregar o script do Rybbit de:', script.src);
  };
  
  
  document.head.appendChild(script);
};

/**
 * Registra um evento personalizado no Rybbit
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>): void => {
  if (window.rybbit && window.rybbit.event) {
    window.rybbit.event(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
    console.log('📊 Evento Rybbit enviado:', eventName);
  } else {
    console.warn('⚠️ Rybbit não está disponível para evento:', eventName, 'Estado:', window.rybbit);
  }
};

/**
 * Registra uma visualização de página
 */
export const trackPageView = (): void => {
  if (window.rybbit && window.rybbit.pageview) {
    window.rybbit.pageview();
  } else {
    console.warn('Rybbit não está disponível para rastrear página');
  }
};

/**
 * Identifica um usuário no Rybbit
 */
export const identifyUser = (userId: string): void => {
  if (window.rybbit && window.rybbit.identify) {
    window.rybbit.identify(userId);
  } else {
    console.warn('Rybbit não está disponível para identificar usuário');
  }
};

/**
 * Eventos pré-definidos para a aplicação
 */
export const RybbitEvents = {
  
  IMAGE_UPLOAD_STARTED: 'image_upload_started',
  IMAGE_UPLOAD_SUCCESS: 'image_upload_success',
  IMAGE_UPLOAD_ERROR: 'image_upload_error',
  IMAGE_DOWNLOAD: 'image_download',
  
  
  PAGE_VIEW: 'page_view',
  APP_LOADED: 'app_loaded',
  
  
  BUTTON_CLICK: 'button_click',
  DIALOG_OPEN: 'dialog_open',
  DIALOG_CLOSE: 'dialog_close',
  
  
  ERROR_OCCURRED: 'error_occurred'
} as const;