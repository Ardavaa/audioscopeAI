"""
Configuration settings for Audioscope AI Flask API.

Provides environment-specific configuration for development, testing, and production.
"""

import os
from pathlib import Path
from typing import List, Optional
import logging


class Config:
    """Base configuration class with common settings."""
    
    # Application settings
    VERSION: str = "1.0.0"
    SECRET_KEY: str = os.environ.get('SECRET_KEY') or 'audioscope-ai-dev-key-2024'
    
    # Server settings
    HOST: str = os.environ.get('FLASK_HOST') or '0.0.0.0'
    PORT: int = int(os.environ.get('FLASK_PORT') or 5000)
    DEBUG: bool = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    # File handling settings
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50MB in bytes
    ALLOWED_EXTENSIONS: List[str] = ['wav', 'mp3', 'flac', 'm4a']
    
    # Directory settings
    BASE_DIR: Path = Path(__file__).parent
    MODEL_DIR: str = str(BASE_DIR)
    TEMP_DIR: str = os.environ.get('TEMP_DIR') or str(BASE_DIR / 'temp')
    LOGS_DIR: str = os.environ.get('LOGS_DIR') or str(BASE_DIR / 'logs')
    
    # ML Pipeline settings
    TARGET_DURATION: float = 7.8560090702947845  # seconds
    EXCLUDED_FEATURES: List[str] = ['mel_spectrogram_min', 'chroma_stft_max']
    
    # Logging settings
    LOG_LEVEL: str = os.environ.get('LOG_LEVEL') or 'INFO'
    LOG_FORMAT: str = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    
    # LLM settings
    GEMINI_API_KEY: str = os.environ.get('GEMINI_API_KEY', 'AIzaSyAEhKUQKI9iQe2KOl_pP62TK1nV3PyTBrs')
    LLM_MODEL_NAME: str = os.environ.get('LLM_MODEL_NAME') or 'gemini-1.5-flash'
    LLM_TIMEOUT: int = int(os.environ.get('LLM_TIMEOUT') or 30)
    LLM_MAX_RETRIES: int = int(os.environ.get('LLM_MAX_RETRIES') or 3)
    ENABLE_LLM: bool = os.environ.get('ENABLE_LLM', 'True').lower() == 'true'
    
    # CORS settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:8080",
        "http://localhost:3000", 
        "http://127.0.0.1:8080",
        "http://127.0.0.1:3000"
    ]
    
    @classmethod
    def init_directories(cls) -> None:
        """Create necessary directories if they don't exist."""
        os.makedirs(cls.TEMP_DIR, exist_ok=True)
        os.makedirs(cls.LOGS_DIR, exist_ok=True)


class DevelopmentConfig(Config):
    """Development environment configuration."""
    DEBUG = True
    LOG_LEVEL = 'DEBUG'


class TestingConfig(Config):
    """Testing environment configuration."""
    TESTING = True
    DEBUG = True
    # Use in-memory or temporary test database
    TEMP_DIR = '/tmp/audioscope_ai_test'


class ProductionConfig(Config):
    """Production environment configuration."""
    DEBUG = False
    LOG_LEVEL = 'WARNING'
    
    # Production-specific settings
    HOST = '0.0.0.0'
    PORT = int(os.environ.get('PORT') or 8000)
    
    def __init__(self):
        super().__init__()
        # Only validate SECRET_KEY when actually using production config
        secret_key = os.environ.get('SECRET_KEY')
        if not secret_key:
            raise ValueError("SECRET_KEY environment variable must be set in production")
        self.SECRET_KEY = secret_key

# Configuration mapping
config_map = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}


def get_config(config_name: Optional[str] = None) -> Config:
    """
    Get configuration class based on environment.
    
    Args:
        config_name: Configuration name ('development', 'testing', 'production')
        
    Returns:
        Config: Configuration class instance
    """
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'default')
    
    config_class = config_map.get(config_name, DevelopmentConfig)
    config_instance = config_class()
    config_instance.init_directories()
    
    logger = logging.getLogger('audioscope-ai')
    
    return config_instance 